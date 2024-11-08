import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Exemplo de rota para listar todos os clientes
router.get('/', (req, res) => {
    pool.query('SELECT * FROM clients', (err, results) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            return res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
        }
        res.json(results);
    });
});

// Exemplo de rota para criar um cliente
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO clients (name, email) VALUES (?, ?)';
    pool.query(query, [name, email], (err, results) => {
        if (err) {
            console.error('Erro ao criar cliente:', err);
            return res.status(500).json({ message: 'Erro ao criar cliente', error: err });
        }
        res.status(201).json({ message: 'Cliente criado com sucesso', clientId: results.insertId });
    });
});

// Adicione mais rotas conforme necessário

export default router;
