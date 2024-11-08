import express from 'express';
import { loginUser, registerUser, listUsers } from '../controllers/usercontroller.js'; // Corrigido para a importação correta

const router = express.Router();

// Rota de login
router.post('/login', loginUser);

// Rota de registro
router.post('/register', registerUser);

// Rota para listar usuários
router.get('/users', listUsers); // Adiciona a rota para listar usuários

export default router;
