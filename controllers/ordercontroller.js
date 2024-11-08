import { Router } from 'express';

export default (Order, Client, Delivery) => {
  const router = Router();

  // Criar uma nova ordem
  router.post('/', async (req, res) => {
    const { orderNumber, clientId, deliveryId } = req.body;

    // Validação básica dos dados
    if (!orderNumber || !clientId || !deliveryId) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
      const newOrder = await Order.create({ orderNumber, clientId, deliveryId });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Listar ordens
  router.get('/', async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          { model: Client, as: 'client' },
          { model: Delivery, as: 'delivery' }
        ]
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar ordens: ' + error.message });
    }
  });

  // Atualizar ordem
  router.put('/:id', async (req, res) => {
    const { id } = req.params;

    // Validação básica dos dados
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Dados para atualização são obrigatórios.' });
    }

    try {
      const [updated] = await Order.update(req.body, { where: { id } });
      if (!updated) {
        return res.status(404).json({ message: 'Ordem não encontrada.' });
      }
      const updatedOrder = await Order.findByPk(id);
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Deletar ordem
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Order.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Ordem não encontrada.' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
