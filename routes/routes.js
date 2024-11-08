import express, { Router } from 'express';
import pedidocontroller from '../controllers/pedidocontroller.js';
import entregadorcontroller from '../controllers/entregadorcontroller.js';
import bairrocontroller from '../controllers/bairrocontroller.js';
import precocontroller from '../controllers/precocontroller.js';
import AdminAuth from '../middlewares/AdminAuth.js'; // Apenas mantenha esse middleware, pois você mencionou que usa AdminAuth




// Rotas de pedi
// Login
app.get("/login", LojaAuth, AdmController.getLogin);
app.get("/loginFuncionario", FuncionarioAuth, AdmController.getLogin);
app.get("/loginAdm", AdminAuth, AdmController.getLogin);
app.post("/login", AdmController.login);
app.post("/administradores", AdmController.novo);

// Painel
app.get("/pedidos", PedidoController.todos); // retorna todos os pedidos
app.put("/aceitarpedido/:id/:entregador", PedidoController.aceita); // aceita um pedido
app.put("/recusarpedido/:id", PedidoController.recusa); // recusa um pedido

// Lojas
app.get("/lojas", LojaController.todos); // retorna todas as lojas
app.post("/lojas", LojaController.novo); // cria uma loja
app.get("/lojas/:id", LojaController.lojaId); // retorna uma loja pelo id
app.get("/lojaEmail/:email", LojaController.lojaEmail); // retorna uma loja pelo email
app.put("/lojas/:id", LojaController.editar); // atualiza uma loja
app.delete("/lojas/:id", LojaController.apagar); // apaga uma loja

// Bairros
app.get("/bairros", BairroController.todos); // retorna todos os bairros
app.post("/bairros", BairroController.novo); // cria um bairro
app.get("/bairros/:id", BairroController.bairroId); // retorna um bairro pelo id
app.put("/bairros/:id", BairroController.editar); // atualiza um bairro
app.delete("/bairros/:id", BairroController.apagar); // apaga um bairro

// Preço
app.get("/preco/:idB/:idL", PrecoController.retornar); // retorna um preço associado a uma loja e um bairro
app.post("/preco", PrecoController.novo); // salva preço associado a uma loja e um bairro
app.put("/preco", PrecoController.editar); // atualiza preço associado a uma loja e um bairro

// Entregadores
app.get("/entregadores", EntregadorController.todos); // retorna todos os entregadores
app.post("/entregadores", EntregadorController.novo); // cria um entregador
app.get("/entregadores/:id", EntregadorController.entregadorId); // retorna um entregador pelo id
app.put("/entregadores/:id", EntregadorController.editar); // atualiza um entregador
app.delete("/entregadores/:id", EntregadorController.apagar); // apaga um entregador

// Pedidos por loja
app.get("/pedidos/:lojaId", PedidoController.pedidosPorLoja);

// IDs
app.get("/ids/:bairroNome/:lojaNome", BairroController.retornarIds);

// Página pedidos
app.put("/pedidos", PedidoController.edita);

// Solicitar
app.post("/pedidos", PedidoController.novo);
app.get("/loja/:nome", LojaController.lojaNome);

// Histórico
app.get("/datas/:inicio/:fim/:id", PedidoController.finalizadosPorData); // retorna pedidos finalizados por data

// Funcionários
app.get("/funcionarios/:id", FuncionarioController.buscaPorLoja);
app.post("/funcionarios", FuncionarioController.novo);
app.get("/pedido/:id", PedidoController.pedidoId);
app.get("/funcionariosId/:id", FuncionarioController.funcionarioId);
app.put("/funcionarios/:id", FuncionarioController.editar);

export default router;
