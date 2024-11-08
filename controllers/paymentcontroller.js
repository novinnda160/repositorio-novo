// controllers/paymentController.js
import Invoice from '../models/Invoice.js';
import Gerencianet from 'gerencianet'; // Bibliotecas para gerar boleto

const gerencianet = new Gerencianet({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    sandbox: true,
});

// Criar fatura
export const createInvoice = async (req, res) => {
    const { clientId, deliveryValue } = req.body;

    try {
        const newInvoice = await Invoice.create({ clientId, value: deliveryValue });
        
        // Chame a função para criar o boleto
        const boletoLink = await createBoleto(newInvoice.id, deliveryValue);

        return res.status(201).json({ invoice: newInvoice, boletoLink });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar fatura.' });
    }
};

// Listar faturas
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        return res.status(200).json(invoices);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar faturas.' });
    }
};

// Deletar fatura
export const deleteInvoice = async (req, res) => {
    const { id } = req.params;

    try {
        await Invoice.destroy({ where: { id } });
        return res.status(204).send(); // Sem conteúdo
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar fatura.' });
    }
};

// Função para criar boleto (semelhante ao exemplo anterior)
async function createBoleto(invoiceId, deliveryValue) {
    const params = {
        body: {
            items: [
                {
                    name: 'Entrega',
                    value: deliveryValue * 100, // Valor em centavos
                    amount: 1,
                },
            ],
            payment: {
                banking_billet: {
                    expire_at: '2024-10-30', // Data de vencimento
                },
            },
        },
    };

    try {
        const response = await gerencianet.createCharge(params);
        return response.data[0].payment.banking_billet.link; // Link do boleto
    } catch (error) {
        throw new Error('Erro ao gerar boleto');
    }
}
