import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do .env

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados!');
  }
});

export default db;
