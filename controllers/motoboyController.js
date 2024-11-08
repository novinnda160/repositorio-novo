import express from 'express';
import { getMotoboys, getMotoboyById, createMotoboy, updateMotoboy, deleteMotoboy } from '../models/motoboy.js';

const router = express.Router();

router.get('/motoboys', async (req, res) => {
    const motoboys = await getMotoboys();
    res.json(motoboys);
});

router.get('/motoboys/:id', async (req, res) => {
    const motoboy = await getMotoboyById(req.params.id);
    res.json(motoboy);
});

router.post('/motoboys', async (req, res) => {
    await createMotoboy(req.body);
    res.status(201).json({ message: 'Motoboy criado com sucesso' });
});

router.put('/motoboys/:id', async (req, res) => {
    await updateMotoboy(req.params.id, req.body);
    res.json({ message: 'Motoboy atualizado com sucesso' });
});

router.delete('/motoboys/:id', async (req, res) => {
    await deleteMotoboy(req.params.id);
    res.json({ message: 'Motoboy excluído com sucesso' });
});

export default router;
