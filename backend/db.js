import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  // Este es mi servidor cambiar posteriormente - Jesus Diaz
  user: "postgres",
  host: "192.168.1.65",
  database: "sigaj",
  password: "ProfesionaL.16",
  port: 5432,
});