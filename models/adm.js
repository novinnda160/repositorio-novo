import knex from "../database/database.js"; // Certifique-se de que a extensão .js esteja presente
import bcrypt from "bcrypt";

class Usuario {
    async buscaTodos() {
        try {
            const usuarios = await knex.select().table("usuarios");
            return usuarios;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async buscaPorId(id) {
        try {
            const result = await knex.select().where({ id }).table("usuarios");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaPorEmail(email) {
        try {
            const result = await knex.select().where({ email }).table("administradores");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaEmail(email) {
        try {
            const result = await knex.select().where('email').table("administradores");
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async edita(id, data) {
        const usuario = await this.buscaPorId(id);
        if (usuario !== undefined) {
            const usuarioAtt = {};
            if (data.email !== undefined) usuarioAtt.email = data.email;
            else return { status: false, error: "Informações incompletas: falta email!" };
            if (data.senha !== undefined) usuarioAtt.senha = data.senha;
            else return { status: false, error: "Informações incompletas: falta senha!" };

            try {
                await knex.update(usuarioAtt).where({ id }).table("usuarios");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "O usuário não existe!" };
        }
    }

    async cria(data) {
        const adm = {};
        if (data.email !== undefined) {
            const result = await this.buscaEmail(data.email);
            if (!result) {
                adm.email = data.email;
            } else {
                return { status: false, error: "O e-mail já está cadastrado!" };
            }
        } else {
            return { status: false, error: "Informações incompletas: falta email!" };
        }

        if (data.senha !== undefined) {
            const hash = await bcrypt.hash(data.senha, 10);
            adm.senha = hash;
        } else {
            return { status: false, error: "Informações incompletas: falta senha!" };
        }
        adm.role = 2;

        try {
            await knex.insert(adm).table("administradores");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }

    async apaga(id) {
        try {
            await knex.where({ id }).delete().table("usuarios");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }
}

export default new Usuario();
