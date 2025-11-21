import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  // Este es mi servidor  - Jesus Diaz
  user: "postgres",
  host: "192.168.1.66",
  database: "sigaj",
  password: "ProfesionaL.16",
  port: 5432,
});