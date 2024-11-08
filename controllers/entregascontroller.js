// controllers/entregaController.js
import db from '../models/db.js';

// Listar entregas
export const listarEntregas = async (req, res) => {
    try {
        const [entregas] = await db.query('SELECT * FROM entregas');
        res.status(200).json(entregas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar entregas' });
    }
};

// Criar entrega
export const criarEntrega = async (req, res) => {
    const { motoboy, cliente } = req.body;

    if (!motoboy || !cliente) {
        return res.status(400).json({ message: 'Motoboy e Cliente são obrigatórios' });
    }

    try {
        await db.query('INSERT INTO entregas (motoboy, cliente) VALUES (?, ?)', [motoboy, cliente]);
        res.status(201).json({ message: 'Entrega criada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar entrega' });
    }
};

// Deletar entrega
export const deletarEntrega = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM entregas WHERE id = ?', [id]);
        res.status(200).json({ message: 'Entrega deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar entrega' });
    }
};
