import entregadores from '../models/entregadores.js';
class EntregadorController {
    async todos(req, res) {
        const entregadores = await Entregador.buscaTodos();
        res.status(200).json(entregadores);
    }

    // Outras funções...
}
// entregadorcontroller.js

export const listar = (req, res) => {
    res.status(200).json({ message: "Listagem de entregadores realizada com sucesso!" });
  };
  
  export const nova = (req, res) => {
    res.status(201).json({ message: "Nova entrega criada com sucesso!" });
  };
  
  
   
export default new EntregadorController();
