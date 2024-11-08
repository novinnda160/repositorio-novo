// controllers/clientController.js
// controllers/ClienteController.js
import { createClient, getClients, updateClient, deleteClient } from '../models/clientModel.js';

export const addClient = async (req, res) => {
    try {
        const client = req.body;
        const result = await createClient(client);
        res.status(201).json({ message: 'Cliente criado com sucesso', clientId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar cliente', error });
    }
};

export const listClients = async (req, res) => {
    try {
        const clients = await getClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar clientes', error });
    }
};

export const editClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = req.body;
        await updateClient(id, client);
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
};

export const removeClient = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteClient(id);
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar cliente', error });
    }
};
