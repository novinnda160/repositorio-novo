
class LojaController {
    async todos(req, res) {
        try {
            const lojas = await Loja.buscaTodas();
            res.status(200).json(lojas);
        } catch (error) {
            res.status(500).send('Erro ao buscar lojas');
        }
    }

    async novo(req, res) {
        try {
            const novaLoja = req.body;
            const result = await Loja.cria(novaLoja);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).send('Erro ao criar loja');
        }
    }

// lojacontroller.js

export const todos = (req, res) => {
    res.status(200).json({ message: "Listagem de lojas realizada com sucesso!" });
  };
  
  
  
  
}

export default new LojaController();
