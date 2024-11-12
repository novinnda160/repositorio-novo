import knex from 'knex';
import dotenv from 'dotenv';
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '******' : 'Not set');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

// Carregar as variáveis de ambiente do .env
dotenv.config();

// Configurar o Knex com as variáveis de ambiente
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

// Função para consultar uma tabela e exibir os resultados
const fetchTableData = async (tableName) => {
  try {
    const results = await db.select('*').from(tableName);
    console.log(`Resultados da tabela ${tableName}:`, results);
  } catch (err) {
    console.error(`Erro na consulta da tabela ${tableName}:`, err);
  }
};

// Consultar todas as tabelas
fetchTableData('usuarios');
fetchTableData('regiao');
fetchTableData('bairros');
fetchTableData('pedidos');
fetchTableData('clientes');

// Fechar a conexão ao finalizar as consultas
process.on('SIGINT', async () => {
  await db.destroy();
  console.log('Conexão com o banco de dados encerrada.');
  process.exit(0);
});

// Exportar as funções para o CRUD de faturas

// Criar uma nova fatura
export const createInvoice = async (req, res) => {
  const { clientId, deliveryValue } = req.body;
  try {
    const [id] = await db('invoices').insert({
      clientId,
      value: deliveryValue,
      status: "Pendente",
    });
    res.send({ message: 'Fatura criada com sucesso!', id });
  } catch (error) {
    res.status(500).send('Erro ao criar fatura');
  }
};

// Listar todas as faturas
export const getInvoices = async (req, res) => {
  try {
    const invoices = await db.select('*').from('invoices');
    res.json(invoices);
  } catch (error) {
    res.status(500).send('Erro ao listar faturas');
  }
};

// Deletar uma fatura
export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    await db('invoices').where({ id }).del();
    res.send({ message: 'Fatura deletada com sucesso!' });
  } catch (error) {
    res.status(500).send('Erro ao deletar fatura');
  }
};


// Exportar a instância do Knex
export default db;
