import express from "express";
import cors from "cors";
import usersRoutes from "../routes/users.js";
import path from "path";

const app = express();
const PORT = 3000; //Cambiar

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use("/api", usersRoutes);

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor escuchando en http://192.168.1.65:${PORT}`) //Cambiar
);
