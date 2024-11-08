import knex from "../database/database.js"; // Verifique se a extensão .js está presente

class Preco {
    async retorna(idB, idL) {
        try {
            const result = await knex.select(["preco"])
                .table("bairros_lojas")
                .where({ loja_id: idL, bairro_id: idB });
                
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async cria(loja, bairro, preco) {
        if (preco !== undefined) {
            const valor = {
                loja_id: loja,
                bairro_id: bairro,
                preco: preco
            };
            try {
                await knex.insert(valor).table("bairros_lojas");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "Falta informação de preço!" };
        }    
    }

    async edita(loja, bairro, preco) {
        if (preco !== undefined) {
            const valor = { preco };
            try {
                await knex.update(valor)
                    .where({ loja_id: loja, bairro_id: bairro })
                    .table("bairros_lojas");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "Falta informação de preço!" };
        }    
    }
}

export default new Preco();
