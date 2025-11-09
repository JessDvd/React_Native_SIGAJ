import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api", usersRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
