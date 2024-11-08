import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '748512g#G',
  database: 'aalevar_sql',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados: ', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados!');
  }
});

// Exemplo de execução de consulta
db.execute('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
  if (err) {
    console.error('Erro ao executar a consulta: ', err);
  } else {
    console.log('Resultados: ', results);
  }
});
