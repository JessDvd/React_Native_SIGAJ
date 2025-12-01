import express from "express";
import cors from "cors";
import usersRoutes from "../routes/users.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor escuchando en http://192.168.1.65:${PORT}`)
);

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});
