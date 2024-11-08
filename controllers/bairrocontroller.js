
class BairroController {
    async todos(req, res) {
        try {
            const bairros = await Bairro.buscaTodos();
            res.status(200).json(bairros);
        } catch (error) {
            res.status(500).send('Erro ao buscar bairros');
        }
    }

    async novo(req, res) {
        try {
            const novoBairro = req.body;
            const result = await Bairro.cria(novoBairro);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).send('Erro ao criar bairro');
        }
    }

      
      
    
}
  

export default new BairroController();
