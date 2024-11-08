// auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from './db.js'; // Certifique-se de que a extensão .js está incluída

// Função para registrar um usuário
export const registerUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Nome de usuário ou senha não fornecidos.');
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao hash da senha:', err);
            return res.status(500).send('Erro interno do servidor.');
        }

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, hash], (err) => {
            if (err) {
                console.error('Erro ao inserir usuário no banco:', err);
                return res.status(500).send('Erro ao registrar usuário.');
            }
            res.status(201).send('Usuário registrado com sucesso!');
        });
    });
};

// Função para logar um usuário
export const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Nome de usuário ou senha não fornecidos.');
    }

    const query = 'SELECT * FROM usuario WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário no banco:', err);
            return res.status(500).send('Erro interno do servidor.');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuário não encontrado.');
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erro ao comparar senhas:', err);
                return res.status(500).send('Erro ao autenticar o usuário.');
            }

            if (!isMatch) {
                return res.status(401).send('Senha incorreta.');
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({ token });
        });
    });
};

// Função para verificar token JWT
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Token não fornecido.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido.');
        }
        req.userId = decoded.id;
        next();
    });
};
