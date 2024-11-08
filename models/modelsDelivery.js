import db from '../database/database.js'; // Importe a instância do Knex

// Função para criar uma nova entrega
export const createDelivery = async (deliveryData) => {
    try {
        const [id] = await db('deliveries').insert(deliveryData);
        return { id, ...deliveryData };
    } catch (error) {
        throw new Error('Erro ao criar a entrega: ' + error.message);
    }
};

// Função para buscar todas as entregas
export const getDeliveries = async () => {
    try {
        const deliveries = await db('deliveries').select('*');
        return deliveries;
    } catch (error) {
        throw new Error('Erro ao buscar as entregas: ' + error.message);
    }
};

// Função para buscar uma entrega específica pelo ID
export const getDeliveryById = async (id) => {
    try {
        const delivery = await db('deliveries').where({ id }).first();
        return delivery;
    } catch (error) {
        throw new Error('Erro ao buscar a entrega pelo ID: ' + error.message);
    }
};

// Função para aceitar uma entrega (atualizar o status)
export const acceptDelivery = async (id, statusUpdate) => {
    try {
        await db('deliveries').where({ id }).update(statusUpdate);
        return { message: 'Entrega atualizada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao atualizar a entrega: ' + error.message);
    }
};

// Função para deletar uma entrega
export const deleteDelivery = async (id) => {
    try {
        await db('deliveries').where({ id }).del();
        return { message: 'Entrega deletada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar a entrega: ' + error.message);
    }
};

export default {
    createDelivery,
    getDeliveries,
    getDeliveryById,
    acceptDelivery,
    deleteDelivery,
};
