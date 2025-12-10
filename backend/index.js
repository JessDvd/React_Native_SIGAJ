import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); //Cambiar
});
