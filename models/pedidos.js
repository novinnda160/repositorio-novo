
import pedidocontroller from '../controllers/pedidocontroller.js';
import knex from "../database/database.js"; // Verifique se a extensão .js está presente

class Pedido {
    async PorData(inicio, fim, id) {
        try {
            const query = knex.select().table("pedidos").whereRaw("status = 1 || status > 5").whereBetween('data', [inicio, fim]);
            if (id !== 0) {
                query.where({ loja_id: id });
            }
            const resultado = await query;
            return resultado;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async criar(data) {
        const pedido = {};
        
        const camposObrigatorios = [
            { campo: 'bairro', msg: "Falta informações: Bairro!" },
            { campo: 'endereco', msg: "Falta informações: Endereço!" },
            { campo: 'numero', msg: "Falta informações: Número do imóvel!" },
            { campo: 'complemento', msg: "Falta informações: Complemento!" },
            { campo: 'nome', msg: "Falta informações: Nome!" },
            { campo: 'documento', msg: "Falta informações: CPF do cliente!" },
            { campo: 'telefone', msg: "Falta informações: Telefone do cliente!" },
        ];

        for (const { campo, msg } of camposObrigatorios) {
            if (data[campo] !== undefined) {
                pedido[campo] = data[campo];
            } else {
                return { status: false, error: msg };
            }
        }

        // Atribuindo outros campos que não são obrigatórios
        pedido.loja_id = data.loja_id;
        pedido.loja_nome = data.loja_nome;
        pedido.data = data.data;
        pedido.loja_endereco = data.loja_endereco;
        pedido.preco = data.preco;
        pedido.status = 0;

        try {
            await knex.insert(pedido).table("pedidos");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }   
    }

    async buscaPorId(id) {
        try {
            const result = await knex.select().where({ id }).table("pedidos");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscarPorLoja(loja) {
        try {
            const resultado = await knex.select().table("pedidos").where({ loja_id: loja });
            return resultado.length > 0 ? resultado : undefined;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async aceitar(id, entregador) {
        try {
            const status = 2;
            await knex.where({ id }).update({ status, entregador }).table("pedidos");
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async recusar(id) {
        try {
            const status = 1;
            await knex.where({ id }).update({ status }).table("pedidos");
        } catch (error) {
            console.log(error);
        }
    }

    async editar(id, status) {
        try {
            await knex.update({ status }).where({ id }).table("pedidos");
        } catch (error) {
            console.log(error);
        }
    }

    async buscaTodos() {
        try {
            const pedidos = await knex.select().table("pedidos");
            return pedidos;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async emAndamento() {
        try {
            const pedidosEmAndamento = await knex.select().whereRaw("status > 2 && status < 7").table("pedidos");
            return pedidosEmAndamento;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default new Pedido();
