import knex from "../database/database.js"; // Verifique se a extensão .js está presente
import bcrypt from "bcrypt";

class Loja {
    async buscaTodos() {
        try {
            const lojas = await knex.select().table("lojas");
            return lojas;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async buscaPorId(id) {
        try {
            const result = await knex.select().where({ id }).table("lojas");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaPorNome(nome) {
        try {
            const result = await knex.select().where({ nome }).table("lojas");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaPorEmail(email) {
        try {
            const result = await knex.select().where({ email }).table("lojas");
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async buscaEmail(email) {
        try {
            const result = await knex.select().where({ email }).table("lojas");
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async buscaEmailEditado(email, id) {
        try {
            const result = await knex.select().where({ email }).table("lojas");
            if (result.length > 0) {
                const loja = await this.buscaPorId(id);
                return result[0].email !== loja.email;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async buscaDocumento(cnpj) {
        try {
            const result = await knex.select().where({ cnpj }).table("lojas");
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async buscaDocumentoEditado(cnpj, id) {
        try {
            const result = await knex.select().where({ cnpj }).table("lojas");
            if (result.length > 0) {
                const loja = await this.buscaPorId(id);
                return result[0].cnpj !== loja.cnpj;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async edita(id, data) {
        const loja = await this.buscaPorId(id);
        if (loja !== undefined) {
            const lojaAtt = {};
            if (data.email !== undefined) {
                const result = await this.buscaEmailEditado(data.email, id);
                if (!result) {
                    lojaAtt.email = data.email;
                } else {
                    return { status: false, error: "O e-mail já está cadastrado!" };
                }
            } else {
                return { status: false, error: "Informações incompletas: falta email!" };
            }

            if (data.senha !== undefined) {
                const hash = await bcrypt.hash(data.senha, 10);
                lojaAtt.senha = hash;
            } else {
                return { status: false, error: "Informações incompletas: falta senha!" };
            }

            lojaAtt.role = 1;
            if (data.nome !== undefined) lojaAtt.nome = data.nome;
            else return { status: false, error: "Informações incompletas: falta nome fantasia!" };

            if (data.cnpj !== undefined) {
                const result = await this.buscaDocumentoEditado(data.cnpj, id);
                if (!result) {
                    lojaAtt.cnpj = data.cnpj;
                } else {
                    return { status: false, error: "O CNPJ já está cadastrado!" };
                }
            } else {
                return { status: false, error: "Informações incompletas: falta CNPJ!" };
            }

            if (data.razao !== undefined) lojaAtt.razao = data.razao;
            else return { status: false, error: "Informações incompletas: falta razão social!" };

            if (data.instituicao !== undefined) lojaAtt.instituicao = data.instituicao;
            else return { status: false, error: "Informações incompletas: falta tipo de instituição!" };

            if (data.endereco !== undefined) lojaAtt.endereco = data.endereco;
            else return { status: false, error: "Informações incompletas: falta endereço!" };

            if (data.bairro !== undefined) lojaAtt.bairro = data.bairro;
            else return { status: false, error: "Informações incompletas: falta bairro!" };

            if (data.cidade !== undefined) lojaAtt.cidade = data.cidade;
            else return { status: false, error: "Informações incompletas: falta cidade!" };

            if (data.estado !== undefined) lojaAtt.estado = data.estado;
            else return { status: false, error: "Informações incompletas: falta estado!" };

            if (data.cep !== undefined) lojaAtt.cep = data.cep;
            else return { status: false, error: "Informações incompletas: falta CEP!" };

            if (data.telefone !== undefined) lojaAtt.telefone = data.telefone;
            else return { status: false, error: "Informações incompletas: falta telefone!" };

            if (data.rep_nome !== undefined) lojaAtt.rep_nome = data.rep_nome;
            else return { status: false, error: "Informações incompletas: falta nome do representante!" };

            if (data.rep_cargo !== undefined) lojaAtt.rep_cargo = data.rep_cargo;
            else return { status: false, error: "Informações incompletas: falta cargo do representante!" };

            if (data.rep_email !== undefined) lojaAtt.rep_email = data.rep_email;
            else return { status: false, error: "Informações incompletas: falta email do representante!" };

            if (data.rep_cpf !== undefined) lojaAtt.rep_cpf = data.rep_cpf;
            else return { status: false, error: "Informações incompletas: falta CPF do representante!" };

            if (data.rep_rg !== undefined) lojaAtt.rep_rg = data.rep_rg;
            else return { status: false, error: "Informações incompletas: falta RG do representante!" };

            try {
                await knex.update(lojaAtt).where({ id }).table("lojas");
                return { status: true };
            } catch (error) {
                return { status: false, error };
            }
        } else {
            return { status: false, error: "A loja não existe!" };
        }
    }

    async cria(data) {
        const loja = {};
        if (data.email !== undefined) {
            const result = await this.buscaEmail(data.email);
            if (!result) {
                loja.email = data.email;
            } else {
                return { status: false, error: "O e-mail já está cadastrado!" };
            }
        } else {
            return { status: false, error: "Informações incompletas: falta email!" };
        }

        if (data.senha !== undefined) {
            const hash = await bcrypt.hash(data.senha, 10);
            loja.senha = hash;
        } else {
            return { status: false, error: "Informações incompletas: falta senha!" };
        }
        
        loja.role = 1;

        if (data.nome !== undefined) loja.nome = data.nome;
        else return { status: false, error: "Informações incompletas: falta nome fantasia!" };

        if (data.cnpj !== undefined) {
            const result = await this.buscaDocumento(data.cnpj);
            if (!result) {
                loja.cnpj = data.cnpj;
            } else {
                return { status: false, error: "O CNPJ já está cadastrado!" };
            }
        } else {
            return { status: false, error: "Informações incompletas: falta CNPJ!" };
        }

        if (data.razao !== undefined) loja.razao = data.razao;
        else return { status: false, error: "Informações incompletas: falta razão social!" };

        if (data.instituicao !== undefined) loja.instituicao = data.instituicao;
        else return { status: false, error: "Informações incompletas: falta tipo de instituição!" };

        if (data.endereco !== undefined) loja.endereco = data.endereco;
        else return { status: false, error: "Informações incompletas: falta endereço!" };

        if (data.bairro !== undefined) loja.bairro = data.bairro;
        else return { status: false, error: "Informações incompletas: falta bairro!" };

        if (data.cidade !== undefined) loja.cidade = data.cidade;
        else return { status: false, error: "Informações incompletas: falta cidade!" };

        if (data.estado !== undefined) loja.estado = data.estado;
        else return { status: false, error: "Informações incompletas: falta estado!" };

        if (data.cep !== undefined) loja.cep = data.cep;
        else return { status: false, error: "Informações incompletas: falta CEP!" };

        if (data.telefone !== undefined) loja.telefone = data.telefone;
        else return { status: false, error: "Informações incompletas: falta telefone!" };

        if (data.rep_nome !== undefined) loja.rep_nome = data.rep_nome;
        else return { status: false, error: "Informações incompletas: falta nome do representante!" };

        if (data.rep_cargo !== undefined) loja.rep_cargo = data.rep_cargo;
        else return { status: false, error: "Informações incompletas: falta cargo do representante!" };

        if (data.rep_email !== undefined) loja.rep_email = data.rep_email;
        else return { status: false, error: "Informações incompletas: falta email do representante!" };

        if (data.rep_cpf !== undefined) loja.rep_cpf = data.rep_cpf;
        else return { status: false, error: "Informações incompletas: falta CPF do representante!" };

        if (data.rep_rg !== undefined) loja.rep_rg = data.rep_rg;
        else return { status: false, error: "Informações incompletas: falta RG do representante!" };

        try {
            await knex.insert(loja).table("lojas");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }

    async apaga(id) {
        try {
            await knex.where({ id }).delete().table("lojas");
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }
}

export default new Loja();
