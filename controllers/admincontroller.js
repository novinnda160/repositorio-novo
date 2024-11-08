import pool from '../db.js';
import bcrypt from 'bcrypt';

export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash a senha

        // Insere o novo administrador no banco de dados
        const [result] = await pool.execute('INSERT INTO administradores (email, senha) VALUES (?, ?)', [email, hashedPassword]);

        return res.status(201).json({ message: 'Administrador registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar administrador:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM administradores WHERE email = ? LIMIT 1', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
