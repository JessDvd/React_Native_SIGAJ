import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  // Este es mi servidor  - Jesus Diaz
  user: "postgres",
  host: "localhost",
  database: "sigaj",
  password: "ProfesionaL.16",
  port: 5432,
});