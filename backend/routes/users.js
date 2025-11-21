import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      console.log(
        `Credenciales inválidas para usuario: ${username} ${password}`
      );
      return res
        .status(401)
        .json({ message: "Credenciales inválidas", user: null });
    }

    const user = result.rows[0];

    return res.json({
      message: "Bienvenido " + user.username,
      user: {
        id: user.id,
        username: user.username,
        rol: user.rol,
      },
    });
  } catch (err) {
    console.error("Error en el servidor:", err);
    return res
      .status(500)
      .json({ message: "Error en el servidor", user: null });
  }
});

router.post("/register/personal", async (req, res) => {
  const { username, paterno, materno, email, user, password } = req.body;

  console.log("Datos recibidos:", req.body);

  if (!username || !paterno || !materno || !email || !user || !password) {
    console.log("Faltan campos:", {
      username,
      paterno,
      materno,
      email,
      user,
      password,
    });
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO usuarios (username, password, rol, paterno, materno, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user, password, "consulta", paterno, materno, email]
    );

    return res.json({
      message: "Usuario registrado exitosamente (Paso 1)",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error al registrar:", err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

router.post("/register2", async (req, res) => {
  const { curp, rfc, num, dep } = req.body;

  console.log("Datos recibidos en /register/detalles:", req.body);

  try {
    if (!curp || !rfc || !num || !dep) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    const check = await pool.query(
      "SELECT * FROM usuarios WHERE curp = $1 OR rfc = $2",
      [curp, rfc]
    );
    if (check.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con ese CURP o RFC." });
    }

    const result = await pool.query(
      "INSERT INTO usuarios (curp, rfc, telefono, departamento, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [curp, rfc, num, dep, "consulta"]
    );

    const nuevoUsuario = result.rows[0];
    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: nuevoUsuario.id,
        curp: nuevoUsuario.curp,
        rfc: nuevoUsuario.rfc,
        telefono: nuevoUsuario.telefono,
        departamento: nuevoUsuario.departamento,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post("/register3", async (req, res) => {
  const { username, password } = req.body;

  console.log("Datos recibidos en /register3:", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const checkUser = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1",
      [username]
    );
    if (checkUser.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya existe." });
    }

    const result = await pool.query(
      "UPDATE usuarios SET username = $1, password = $2 WHERE username IS NULL RETURNING *",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró un usuario para actualizar." });
    }

    return res.json({
      message: "Cuenta creada correctamente",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error en /register3:", err);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

router.get("/buscarUsuario", async (req, res) => {
  const query = req.query.query;

  try {
    const result = await pool.query(
      `SELECT id, username, rol, paterno, materno, email, curp, rfc, telefono, departamento
       FROM usuarios
       WHERE 
        username ILIKE $1 || '%'
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
    // Buscar usuario por email
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No existe un usuario con ese correo." });
    }

    const user = result.rows[0];

    // Registrar solicitud en tabla "solicitudes_contrasena"
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

export default router;
