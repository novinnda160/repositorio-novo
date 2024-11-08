import Pedidos from '../models/pedidos.js';  // Modelo de Pedido
import entregadores from '../models/entregadores.js';  // Modelo de Entregador
import Loja from '../models/Loja.js';  // Modelo de Loja
import Bairro from '../models/Bairro.js';  // Modelo de Bairro

class PedidoController {
    // Buscar todos os pedidos
    async todos(req, res) {
        try {
            const pedidos = await Pedidos.buscaTodos(); // Método no modelo para buscar todos os pedidos
            res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar pedidos.' });
        }
    }

    // Aceitar um pedido (vincula um entregador)
    async aceita(req, res) {
        const { id, entregador } = req.params; // ID do pedido e do entregador
        try {
            const pedido = await Pedidos.aceitarPedido(id, entregador); // Método no modelo que marca o pedido como aceito
            res.status(200).json({ message: 'Pedido aceito com sucesso.', pedido });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao aceitar o pedido.' });
        }
    }

    // Recusar um pedido
    async recusa(req, res) {
        const { id } = req.params;
        try {
            const pedido = await Pedidos.recusarPedido(id); // Método no modelo que marca o pedido como recusado
            res.status(200).json({ message: 'Pedido recusado com sucesso.', pedido });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao recusar o pedido.' });
        }
    }

    // Buscar pedidos por loja
    async pedidosPorLoja(req, res) {
        const { lojaId } = req.params;
        try {
            const pedidos = await Pedidos.buscaPorLoja(lojaId); // Método no modelo que busca pedidos por loja
            res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar pedidos por loja.' });
        }
    }

    // Editar um pedido (atualizar informações do pedido)
    async edita(req, res) {
        const { id, status, entregadorId } = req.body;
        try {
            const pedidoAtualizado = await Pedidos.atualizar(id, { status, entregadorId });
            res.status(200).json({ message: 'Pedido atualizado com sucesso.', pedido: pedidoAtualizado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o pedido.' });
        }
    }

    // Criar um novo pedido
    async novo(req, res) {
        const { lojaId, cliente, endereco, produtos } = req.body;
        try {
            const novoPedido = await Pedidos.criar({ lojaId, cliente, endereco, produtos });
            res.status(201).json({ message: 'Pedido criado com sucesso.', pedido: novoPedido });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar o pedido.' });
        }
    }

    // Buscar pedido por ID
    async pedidoId(req, res) {
        const { id } = req.params;
        try {
            const pedido = await Pedidos.buscaPorId(id); // Método que busca pedido pelo ID
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }
            res.status(200).json(pedido);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o pedido.' });
        }
    }

    // Buscar pedidos finalizados por data
    async finalizadosPorData(req, res) {
        const { inicio, fim, id } = req.params;
        try {
            const pedidos = await Pedidos.buscaFinalizadosPorData(inicio, fim, id); // Buscar pedidos finalizados nesse intervalo
            res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar pedidos finalizados por data.' });
        }
    }
}

export default new PedidoController(); // Exportar a instância do controlador
