// backend/routes/orderRoutes.js
import express from 'express';
import db from '../database/database.js';

const router = express.Router();

// Obter todos os pedidos
router.get('/', async (req, res) => {
  try {
    const orders = await db('orders');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pedidos' });
  }
});

// Criar um novo pedido
router.post('/', async (req, res) => {
  const { clientId, product, quantity } = req.body;
  try {
    const [id] = await db('orders').insert({ clientId, product, quantity });
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
});

// Deletar um pedido
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db('orders').where({ id }).del();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido' });
  }
});

export default router;
