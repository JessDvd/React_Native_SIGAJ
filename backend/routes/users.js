import express from "express";
import { pool } from "../db.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const limpiar = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, ""); // solo letras
};

// ------------------------
// CONFIGURACIÓN SUBIDA
// ------------------------
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

// ------------------------
// LOGIN
// ------------------------
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
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

// ------------------------
// GENERADOR DE USUARIOS
// ------------------------
async function generarUsuarioUnico(nombreCompleto) {
  const base = nombreCompleto.trim().toLowerCase().replace(/\s+/g, "");
  const primerasLetras = base.substring(0, 4);

  let usuario;
  let existe = true;

  while (existe) {
    const random = Math.random().toString(36).substring(2, 6);
    usuario = `${primerasLetras}${random}`;

    const check = await pool.query(
      "SELECT id FROM usuarios WHERE usuario_generado = $1",
      [usuario]
    );

    if (check.rows.length === 0) existe = false;
  }

  return usuario;
}

router.post("/generar-usuario", async (req, res) => {
  try {
    const { nombre, paterno, materno } = req.body;

    if (!nombre || !paterno || !materno) {
      return res.status(400).json({
        message: "Faltan datos: nombre, paterno o materno",
      });
    }

    const nombreCompleto = `${nombre} ${paterno} ${materno}`;
    const usuario_generado = await generarUsuarioUnico(nombreCompleto);

    return res.json({ usuario_generado });
  } catch (error) {
    console.error("Error en /generar-usuario:", error);
    res.status(500).json({ message: "Error generando usuario" });
  }
});

// ------------------------
// REGISTRO (CORREGIDO)
// ------------------------
router.post("/register", async (req, res) => {
  const {
    username, // <-- viene del frontend
    password,
    nombre,
    paterno,
    materno,
    email,
    curp,
    rfc,
    telefono,
    departamento,
  } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username y password requeridos" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO usuarios 
        (username, usuario_generado, password, rol, nombre, paterno, materno, email, curp, rfc, telefono, departamento)
        VALUES ($1,$2,$3,'consulta',$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *`,
      [
        username, // usamos el username que ya generó el frontend
        username, // almacenamos igual en usuario_generado
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


// ------------------------
// BUSCAR USUARIO (ACTUALIZADO)
// ------------------------
router.get("/buscarUsuario", async (req, res) => {
  const query = req.query.query;

  try {
    const result = await pool.query(
      `SELECT 
        id,
        username,
        usuario_generado,
        rol,
        nombre,
        paterno,
        materno,
        email,
        curp,
        rfc,
        telefono,
        departamento
      FROM usuarios
      WHERE 
        usuario_generado ILIKE $1 || '%'
        OR username ILIKE $1 || '%'
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

// ------------------------
// SUBIR ARCHIVO
// ------------------------
router.post("/subirArchivo", upload.single("archivo"), async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const archivo = req.file;

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

    res.json({
      message: "Archivo subido correctamente",
      archivo: result.rows[0],
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ------------------------
router.get("/archivos/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const result = await pool.query(
      `
      SELECT 
        a.id_archivos AS id,
        a.nombre,
        a.fecha,
        CONCAT('http://192.168.1.65:3000', a.url) AS url,
        u.nombre AS usuario
      FROM archivos a
      LEFT JOIN usuarios u ON a.id_usuario = u.id
      WHERE a.id_usuario = $1
      ORDER BY a.fecha DESC
      `,
      [id_usuario]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/generar-usuario", async (req, res) => {
  try {
    const { nombre, apellido_p } = req.body;

    if (!nombre || !apellido_p) {
      return res.status(400).json({ message: "Faltan datos necesarios." });
    }

    // Base: primera letra del nombre + apellido paterno limpio
    const base = limpiar(nombre[0] + apellido_p);

    // Verificar si ya existe el usuario
    const query = `
      SELECT username FROM usuarios
      WHERE username LIKE $1 || '%'
    `;
    const result = await pool.query(query, [base]);

    let usuarioGenerado = base;

    if (result.rows.length > 0) {
      usuarioGenerado = base + result.rows.length; // ej: base2, base3...
    }

    return res.json({
      usuario_generado: usuarioGenerado,
    });
  } catch (error) {
    console.log("Error generando usuario:", error);
    return res.status(500).json({ message: "Error generando usuario." });
  }
});

export default router;
