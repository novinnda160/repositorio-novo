import jwt from 'jsonwebtoken';
import connection from './db.js';

const authMiddleware = (req, res, next) => {
    // Tenta obter o token dos cookies ou do cabeçalho de autorização
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
    }

    try {
        // Verifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Armazena o usuário decodificado no objeto da requisição
        next(); // Chama o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
// Middleware de autenticação para administradores
const isAdminAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login'); // Redireciona para a página de login se não autenticado
};

export default authMiddleware;
