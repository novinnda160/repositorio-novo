import express from 'express';
import { acceptDelivery } from '../controllers/deliveryController.js';

const router = express.Router();

// Mock database
let deliveries = [
    { id: 1, searchAddress: 'Rua das Flores, 123', deliveryAddress: 'Avenida das Palmeiras, 456', deliveryFee: 5.00, accepted: false },
    // Adicione mais entregas conforme necessário
];

// Rota para aceitar uma entrega
router.post('/accept/:id', (req, res) => {
    const { id } = req.params;
    const delivery = deliveries.find(d => d.id == id);

    if (delivery && !delivery.accepted) {
        delivery.accepted = true;
        return res.json({
            success: true,
            message: 'Corrida aceita com sucesso!',
            delivery
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Entrega não encontrada ou já aceita!'
        });
    }
});

export default router;
