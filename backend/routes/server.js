import express from "express";
import cors from "cors";
import usersRoutes from "../routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

//('adminPro', 'admin123', 'editor');