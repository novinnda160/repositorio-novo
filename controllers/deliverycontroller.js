// controllers/deliverycontroller.js

import modelsDelivery from '../models/modelsDelivery.js';

// Criar um novo delivery
export const createDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.create(req.body);
        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar todos os deliveries
export const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.findAll();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aceitar um delivery
export const acceptDelivery = async (req, res) => {
    try {
        await Delivery.update(
            { status: 'accepted' },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ message: 'Delivery accepted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
