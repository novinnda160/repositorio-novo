// AuthController.js

// Mock database for users
const users = [];

// Controlador para login
const loginUser = (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
        // Retorne uma resposta com sucesso e a URL de redirecionamento
        res.status(200).json({ message: 'Login bem-sucedido!', redirect: '/home.html' });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas!' });
    }
};

// Controlador para registro
const registerUser = (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o email já existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email já registrado!' });
    }

    // Adiciona o novo usuário
    users.push({ nome, email, senha });
    res.status(201).json({ message: 'Registro bem-sucedido!' });
};

// Criação do objeto AuthController
const AuthController = {
    loginUser,
    registerUser
};

// Exportação do objeto AuthController
export default AuthController;
