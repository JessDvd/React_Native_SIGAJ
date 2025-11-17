import express from "express";
import cors from "cors";
import usersRoutes from "../routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor escuchando en http://192.168.1.66:${PORT}`)
);

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

//('adminPro', 'admin123', 'editor');
