import { hash } from 'bcrypt';
import db from './database/database.js'; // Ajuste para o caminho correto do arquivo de configuração do banco de dados

async function createAdmin() {
    const username = 'alevar2024@gmail.com';
    const password = 'adminalevar'; // A senha que você quer usar

    // Criptografa a senha
    const hashedPassword = await hash(password, 10);

    // Insere o usuário no banco de dados
    await db('administradores').insert({
        username: username,
        senha: hashedPassword // Armazena a senha criptografada
    });

    console.log('Usuário admin criado com sucesso!');
}

createAdmin().catch(console.error);
