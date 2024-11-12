import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log('Conectado ao banco de dados com sucesso!');
    await connection.end();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

testConnection();
