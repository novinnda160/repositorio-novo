import knex from "../database/database.js"; // Certifique-se de que a extensão .js esteja presente

class Bairro {
    async buscaTodos() {
        try {
            const bairros = await knex.select().table("bairros");
            return bairros;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async buscaPorId(id) {
        try {
            const result = await knex.select().where({ id }).table("bairros");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaPorNome(nome) {
        try {
            const result = await knex.select().where({ nome }).table("bairros");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async edita(id, data) {
        const bairro = await this.buscaPorId(id);
        if (bairro !== undefined) {
            const bairroAtt = {};
            if (data.nome !== undefined) bairroAtt.nome = data.nome;
            else return { status: false, error: "Informações incompletas: falta nome!" };
            if (data.regiao_geo !== undefined) bairroAtt.regiao_geo = data.regiao_geo;
            else return { status: false, error: "Informações incompletas: falta região geográfica!" };
            if (data.regiao_adm !== undefined) bairroAtt.regiao_adm = data.regiao_adm;
            else return { status: false, error: "Informações incompletas: falta região administrativa!" };

            try {
                await knex.update(bairroAtt).where({ id }).table("bairros");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "O bairro não existe!" };
        }
    }

    async cria(data) {
        const bairro = {};
        if (data.nome !== undefined) bairro.nome = data.nome;
        else return { status: false, error: "Informações incompletas: falta nome!" };
        if (data.regiao_geo !== undefined) bairro.regiao_geo = data.regiao_geo;
        else return { status: false, error: "Informações incompletas: falta região geográfica!" };
        if (data.regiao_adm !== undefined) bairro.regiao_adm = data.regiao_adm;
        else return { status: false, error: "Informações incompletas: falta região administrativa!" };

        try {
            await knex.insert(bairro).table("bairros");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }

    async apaga(id) {
        try {
            await knex.where({ id }).delete().table("bairros");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }
}

export default new Bairro();
