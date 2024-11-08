import Funcionario from '../models/funcionario.js';

class FuncionarioController {
    async todos(req, res) {
        const funcionarios = await Funcionario.buscaTodos();
        res.status(200).json(funcionarios);
    }

    // Outras funções...
}

export default new FuncionarioController();
