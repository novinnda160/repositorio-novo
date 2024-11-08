import Preco from '../models/preco.js';

class PrecoController {
    async retornar(req, res) {
        const { idB, idL } = req.params;
        const preco = await Preco.buscaPorIds(idB, idL);
        res.status(200).json(preco);
    }

    // Outras funções...
}


export const retornar = (req, res) => {
    res.status(200).json({ message: `Retornando preço para loja ${req.params.idL} e bairro ${req.params.idB}` });
  };
  
  export const novo = (req, res) => {
    res.status(201).json({ message: "Novo preço criado com sucesso!" });
  };
  
  
  

export default Preco;
