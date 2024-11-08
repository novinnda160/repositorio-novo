import knex from "../database/database.js"; // Certifique-se de que a extensão .js esteja presente

class Entregador {
    async buscaTodos() {
        try {
            const entregadores = await knex.select().table("entregadores");
            return entregadores;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async buscaPorId(id) {
        try {
            const result = await knex.select().where({ id }).table("entregadores");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaEmail(email) {
        try {
            const result = await knex.select().where({ email }).table("entregadores");
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async buscaPlaca(placa) {
        try {
            const result = await knex.select().where({ placa }).table("entregadores");
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async edita(id, data) {
        const entregador = await this.buscaPorId(id);
        if (entregador !== undefined) {
            const entregadorAtt = {};
            if (data.nome !== undefined) entregadorAtt.nome = data.nome;
            else return { status: false, error: "Informações incompletas: falta nome!" };
            if (data.tel_contato !== undefined) entregadorAtt.tel_contato = data.tel_contato;
            else return { status: false, error: "Informações incompletas: falta telefone de contato!" };
            if (data.placa !== undefined) entregadorAtt.placa = data.placa;
            else return { status: false, error: "Informações incompletas: falta placa do veículo!" };

            try {
                await knex.update(entregadorAtt).where({ id }).table("entregadores");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "O entregador não existe!" };
        }
    }

    async cria(data) {
        const entregador = {};
        if (data.nome !== undefined) entregador.nome = data.nome;
        else return { status: false, error: "Informações incompletas: falta nome!" };
        if (data.tel_contato !== undefined) entregador.tel_contato = data.tel_contato;
        else return { status: false, error: "Informações incompletas: falta telefone de contato!" };
        if (data.placa !== undefined) {
            const result = await this.buscaPlaca(data.placa);
            if (!result) entregador.placa = data.placa;
            else return { status: false, error: "Já existe um entregador com essa placa!" };
        } else {
            return { status: false, error: "Informações incompletas: falta placa do veículo!" };
        }

        try {
            await knex.insert(entregador).table("entregadores");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }

    async apaga(id) {
        try {
            await knex.where({ id }).delete().table("entregadores");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }
}

export default new Entregador();
