module.exports = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'seu_usuario',
        password: 'sua_senha',
        database: 'nome_do_banco'
    }
};
app.get('/api/regioes', async (req, res) => {
    try {
      const regioes = await db('regioes').select('id', 'nome');
      res.json(regioes);
    } catch (error) {
      console.error('Erro ao buscar regiões:', error);
      res.status(500).json({ message: 'Erro ao buscar regiões.' });
    }
  });
  