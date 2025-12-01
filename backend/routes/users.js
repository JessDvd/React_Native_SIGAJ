import express from "express";
import { pool } from "../db.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido. Solo PDF o DOC."), false);
    }
  },
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Ingrese el Nombre de Usuario y Contraseña." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nombre de Usuario no Registrado." });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña Incorrecta." });
    }

    return res.json({
      message: "Bienvenido " + user.username,
      user: {
        id: user.id,
        username: user.username,
        rol: user.rol,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error en el servidor", user: null });
  }
});

router.post("/register", async (req, res) => {
  const {
    nombre,
    paterno,
    materno,
    email,
    curp,
    rfc,
    telefono,
    departamento,
    username,
    password,
  } = req.body;

  if (
    !nombre ||
    !paterno ||
    !materno ||
    !email ||
    !curp ||
    !rfc ||
    !telefono ||
    !departamento ||
    !username ||
    !password
  ) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const check = await pool.query(
      "SELECT * FROM usuarios WHERE curp=$1 OR rfc=$2 OR username=$3",
      [curp, rfc, username]
    );

    if (check.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "CURP, RFC o Usuario ya registrados" });
    }

    const result = await pool.query(
      `INSERT INTO usuarios 
   (username, password, rol, nombre, paterno, materno, email, curp, rfc, telefono, departamento)
   VALUES ($1,$2,'consulta',$3,$4,$5,$6,$7,$8,$9,$10) 
   RETURNING *`,
      [
        username,
        password,
        nombre,
        paterno,
        materno,
        email,
        curp,
        rfc,
        telefono,
        departamento,
      ]
    );

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

router.get("/buscarUsuario", async (req, res) => {
  const query = req.query.query;

  try {
    const result = await pool.query(
      `SELECT id, username, rol, nombre, paterno, materno, email, curp, rfc, telefono, departamento
       FROM usuarios
       WHERE 
        username ILIKE $1 || '%'
        OR nombre ILIKE $1 || '%'
        OR paterno ILIKE $1 || '%'
        OR materno ILIKE $1 || '%'
        OR email ILIKE $1 || '%'
        OR curp ILIKE $1 || '%'
        OR rfc ILIKE $1 || '%'
        OR departamento ILIKE $1 || '%'
        OR CAST(id AS TEXT) ILIKE $1 || '%'`,
      [query]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error buscando usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/contrasenaOlvido", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El correo es obligatorio." });
  }

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No existe un usuario con ese correo." });
    }

    const user = result.rows[0];

    await pool.query(
      "INSERT INTO solicitudes_contrasena (usuario_id, email) VALUES ($1, $2)",
      [user.id, email]
    );

    return res.json({
      message:
        "Solicitud enviada correctamente. El administrador recibirá la notificación.",
    });
  } catch (error) {
    console.error("Error en /contrasenaOlvido:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/subirArchivo", upload.single("archivo"), async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const archivo = req.file;

    console.log("REQ.BODY:", req.body);

    if (!archivo) {
      return res.status(400).json({ message: "Debe seleccionar un archivo." });
    }

    const id_archivos = uuidv4();
    const fecha = new Date().toISOString().slice(0, 10);
    const url = `/uploads/${archivo.filename}`;

    const result = await pool.query(
      `INSERT INTO archivos (id_archivos, nombre, fecha, url, id_usuario)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id_archivos, archivo.originalname, fecha, url, id_usuario]
    );
    console.log("ARCHIVOS ENCONTRADOS:", result.rows);

    res.json({
      message: "Archivo subido correctamente",
      archivo: result.rows[0],
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// GET /api/archivos
router.get("/archivos", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.id_archivos, a.nombre, a.fecha,
          CONCAT('http://192.168.1.65:3000', a.url) AS url,
          u.username AS usuario
   FROM archivos a
   LEFT JOIN usuarios u ON a.id_usuario = u.id
   ORDER BY a.fecha DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo archivos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
