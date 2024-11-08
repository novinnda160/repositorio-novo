import UsuarioModel from '../models/usuario.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        console.log(`Tentando encontrar usuário com email: ${email}`);

        // Buscar usuário pelo email
        const usuario = await UsuarioModel.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Comparar a senha informada com a senha armazenada
        const isMatch = await bcrypt.compare(password, usuario.senha);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Login bem-sucedido, você pode gerar um token ou fazer outras operações aqui
        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return res.status(500).json({ message: 'Erro ao autenticar o usuário' });
    }
};
