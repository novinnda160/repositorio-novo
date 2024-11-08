import jwt from 'jsonwebtoken'; // Certifique-se de que está importando jwt

// Middleware para autenticação de administrador
const AdminAuth = (req, res, next) => {
    const token = req.cookies.token; // Pegando o token do cookie
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        if (usuario.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        req.user = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    // Obtém o token do cabeçalho da requisição
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    // Verifica e decodifica o token
    jwt.verify(token, 'seu-segredo', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
        req.user = decoded; // Adiciona as informações do usuário à requisição
        next(); // Passa para a próxima rota
    });
};

export default AdminAuth;
