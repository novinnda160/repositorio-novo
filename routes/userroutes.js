import express from 'express';
import { loginUser, registerUser, getUsers } from '../controllers/UserController.js'; // Importa as funções do controlador

const router = express.Router();

// Rota de login
router.post('/login', loginUser);

// Rota de registro
router.post('/register', registerUser);

// Rota para listar usuários
router.get('/users', getUsers); // Adiciona a rota para listar usuários

export default router;
