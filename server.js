// Importações e configurações iniciais
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import bcrypt from 'bcrypt';
import session from 'express-session';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import db from './database/database.js'; // Conexão com o banco de dados
dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com;");
    next();
  });
  
// Configurar Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://code.jquery.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com;");
    next();
});
// Configurar headers CORS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Desativar cache
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});


// Configuração de sessões
app.use(session({
    secret: process.env.SESSION_SECRET || 'chave-secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Para produção, configure secure: true e use HTTPS
}));

// Middleware de autenticação
const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.status(401).json({ message: 'Usuário não autenticado' });
};

// Rotas de Autenticação
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Rotas de Autenticação
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'admin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
});

app.get('/loguin', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'loguin.html'));
});

app.get('/home', isAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'home.html'));
});


app.get('/home', isAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'admin.html'));
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API para calcular a distância e valor da entrega
const OPENCAGE_API_KEY = '0015fbbb711d4074acf8bc2f66fcfe35';
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

async function obterCoordenadas(endereco) {
    try {
        const response = await axios.get(`${BASE_URL}?q=${encodeURIComponent(endereco)}&key=${OPENCAGE_API_KEY}`);
        const data = response.data.results[0];

        if (!data) {
            throw new Error('Endereço não encontrado');
        }

        const { lat, lng } = data.geometry;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        throw new Error('Erro ao buscar as coordenadas');
    }
}

// Função para calcular a distância entre dois pontos geográficos usando Haversine
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em km
}

app.post('/api/calcular-entrega', async (req, res) => {
    const { enderecoEntrega, enderecoColeta } = req.body;

    try {
        const coleta = await obterCoordenadas(enderecoColeta);
        const entrega = await obterCoordenadas(enderecoEntrega);

        const distancia = calcularDistancia(coleta.latitude, coleta.longitude, entrega.latitude, entrega.longitude);
        const valorEntrega = distancia * 2; // Valor da entrega: R$2,00 por km

        res.json({
            distancia: distancia.toFixed(2),
            valorEntrega: valorEntrega.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota de Login
// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Aqui você pode verificar o usuário no banco de dados
    if (email === 'gatsbyagency2024@gmail.com' && password === '748512g#G') {
        res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});
// Rota de logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao realizar logout' });
        }
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
});
  //////////////////////////////////gmail//////////////////////////////////////////////////////////////////////////////


// Rota para enviar os dados do formulário
app.post('/api/registro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Conteúdo do email a ser enviado
    const mailOptions = {
        from: 'alevaradm@gmail.com', // Seu e-mail de envio
        to: 'alevaradm@gmail.com', // E-mail de destino (o e-mail da empresa que irá revisar o cadastro)
        subject: 'Novo Cadastro - Painel Administrativo',
        text: `
            **Novo Cadastro:**
            
            *Nome:* ${nome}
            *Email:* ${email}
            *Senha:* ${senha}
        `
    };

    // Enviar o email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Erro ao enviar email:', err);
            return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail.' });
        }

        console.log('Email enviado:', info.response);
        return res.json({ success: true, message: 'Cadastro enviado para revisão por e-mail.' });
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------- CRUD para Usuários -------------------
app.post('/api/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const existingUser = await db('usuarios').where('email', email).first();
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await db('usuarios').insert({ nome, email, senha: hashedPassword });
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// ------------------- CRUD para Pedidos -------------------
app.post('/api/pedidos', async (req, res) => {
    const { cliente_id, motoboy_id, endereco_entrega, status, valor } = req.body;

    if (!cliente_id || !motoboy_id || !endereco_entrega || !status || !valor) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        await db('pedidos').insert({ cliente_id, motoboy_id, endereco_entrega, status, valor });
        res.status(201).json({ message: 'Pedido criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido' });
    }
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const pedidos = await db('pedidos').select('*');
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
});

app.put('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedRows = await db('pedidos').where({ id }).update({ status });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
});

app.delete('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await db('pedidos').where({ id }).del();
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.status(200).json({ message: 'Pedido excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar pedido' });
    }
});

// ------------------- Financeiro -------------------
app.get('/api/financeiro/relatorio', async (req, res) => {
    try {
        const relatorio = await db('pedidos')
            .sum('valor as totalReceita')
            .count('id as totalPedidos')
            .first();

        res.status(200).json(relatorio);
    } catch (error) {
        console.error('Erro ao gerar relatório financeiro:', error);
        res.status(500).json({ message: 'Erro ao gerar relatório financeiro' });
    }
});

// ------------------- CRUD para Faturamento -------------------
// Rota para buscar faturamentos de um cliente específico
app.get('/api/faturamento/cliente/:clientId', async (req, res) => {
    const { clientId } = req.params;

    try {
        const faturamentos = await db('faturamento')
            .where({ cliente_id: clientId })
            .select('*');

        if (faturamentos.length === 0) {
            return res.status(404).json({ message: 'Nenhum faturamento encontrado para esse cliente' });
        }

        res.status(200).json(faturamentos);
    } catch (error) {
        console.error('Erro ao buscar faturamentos para o cliente:', error);
        res.status(500).json({ message: 'Erro ao buscar faturamentos para o cliente' });
    }
});
app.get('/api/faturamento/cliente/:clienteId', async (req, res) => {
    const { clienteId } = req.params;

    try {
        const faturamentos = await db('faturamento').where('cliente_id', clienteId).select('*');
        
        if (faturamentos.length === 0) {
            return res.status(404).json({ message: 'Nenhum faturamento encontrado para este cliente.' });
        }

        res.status(200).json(faturamentos);
    } catch (error) {
        console.error('Erro ao buscar faturamentos:', error);
        res.status(500).json({ message: 'Erro ao buscar faturamentos' });
    }
});



// ------------------------------------------------faturas painel dashboar-------------------------------//////////////////////////////////////////////////-------------

// Rota para listar todas as corridas do mês atual
app.get('/api/corridas/mes', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT id, cliente, data, localColeta, localEntrega
            FROM corridas
            WHERE MONTH(data) = MONTH(CURDATE()) AND YEAR(data) = YEAR(CURDATE())
        `);
        console.log(rows); // Adicionado para depuração

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar corridas do mês.' });
    }
});

// Rota para adicionar uma nova corrida
app.post('/api/corridas', async (req, res) => {
    const { cliente, data, localColeta, localEntrega } = req.body;
    try {
        await pool.query(
            'INSERT INTO corridas (cliente, data, localColeta, localEntrega) VALUES (?, ?, ?, ?)',
            [cliente, data, localColeta, localEntrega]
        );
        res.json({ message: 'Corrida adicionada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar corrida.' });
    }
});

// Rota para buscar uma corrida específica
app.get('/api/corridas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM corridas WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Corrida não encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar corrida.' });
    }
});

// Rota para atualizar uma corrida
app.put('/api/corridas/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente, data, localColeta, localEntrega } = req.body;
    try {
        await pool.query(
            'UPDATE corridas SET cliente = ?, data = ?, localColeta = ?, localEntrega = ? WHERE id = ?',
            [cliente, data, localColeta, localEntrega, id]
        );
        res.json({ message: 'Corrida atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar corrida.' });
    }
});

// Rota para deletar uma corrida
app.delete('/api/corridas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM corridas WHERE id = ?', [id]);
        res.json({ message: 'Corrida deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar corrida.' });
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------
// Rota para buscar o endereço de coleta de um cliente
app.get('/api/endereco/:clienteId', async (req, res) => {
    const { clienteId } = req.params;

    try {
        // Usando Knex para buscar o endereço do cliente
        const results = await db('clientes').select('endereco').where({ id: clienteId });

        if (results.length === 0) {
            console.log(`Cliente com ID ${clienteId} não encontrado.`);
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Retorna o endereço do cliente encontrado
        res.json({ endereco: results[0].endereco });
    } catch (error) {
        console.error('Erro ao buscar endereço:', error.message); // Log detalhado do erro
        res.status(500).json({ error: 'Erro no servidor ao buscar endereço' });
    }
});
//---------------------------------------------faturamento--------------------------------------------------------

// Rota para buscar o faturamento do mês
app.get('/api/faturamento', (req, res) => {
    const query = 'SELECT * FROM faturamento WHERE MONTH(data) = MONTH(CURRENT_DATE()) AND YEAR(data) = YEAR(CURRENT_DATE())';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar faturamento:', err);  // Log de erro
            return res.status(500).json({ error: 'Erro ao buscar faturamento' });
        }
        
        res.json(results);  // Retorna os resultados em formato JSON
    });
});

// Rota para deletar um faturamento
app.delete('/api/faturamento/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM faturamento WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir faturamento:', err);
            return res.status(500).json({ error: 'Erro ao excluir faturamento' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento não encontrado' });
        }

        res.json({ message: 'Faturamento excluído com sucesso' });
    });
});



// ------------------- CRUD para Clientes -------------------
// Criar um novo cliente
// Criar um novo cliente
app.post('/api/clientes', async (req, res) => {
    const { nome, cpf, endereco_coleta, status } = req.body;

    // Verificando se todos os campos necessários foram fornecidos
    if (!nome || !cpf || !endereco_coleta || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const [id] = await db('clientes').insert({ nome, cpf, endereco_coleta, status });
        res.status(201).json({ id, message: 'Cliente criado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar cliente' });
    }
});

// Listar todos os clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const clientes = await db('clientes').select('id', 'nome', 'cpf', 'endereco_coleta', 'status');
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar clientes' });
    }
});

// Buscar cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await db('clientes').where({ id }).first(); // Obter um cliente específico pelo ID
        if (cliente) {
            res.json(cliente); // Retorna os dados do cliente
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cliente' });
    }
});

// Atualizar cliente
app.put('/api/clientes/:id', async (req, res) => {
    const { nome, cpf, endereco_coleta, status } = req.body;
    const { id } = req.params;

    if (!nome || !cpf || !endereco_coleta || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const updatedRows = await db('clientes').where({ id }).update({ nome, cpf, endereco_coleta, status });
        if (updatedRows) {
            res.json({ message: 'Cliente atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
});

// Deletar cliente
app.delete('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await db('clientes').where({ id }).del();
        if (deletedRows) {
            res.json({ message: 'Cliente excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar cliente' });
    }
});


// ------------------- Rota para enviar dados para o painel admin -------------------

// Rota para enviar os clientes para o painel admin
app.get('/api/admin/painel-clientes', isAuthenticated, async (req, res) => {
    try {
        const clientes = await db('clientes').select('*');
        res.render('admin/painel-clientes', { clientes }); // Assume que você usa um template engine como EJS ou Pug
    } catch (error) {
        console.error('Erro ao enviar clientes para o painel:', error);
        return res.status(500).json({ message: 'Erro ao enviar clientes para o painel admin' });
    }
});

// Rota para obter todos os clientes
app.get('/api/pagamentos/clientes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter clientes', error });
    }
});

// Rota para obter débitos de um cliente específico
app.get('/api/pagamentos/clientes/:id/debitos', async (req, res) => {
    const clientId = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM debitos WHERE client_id = ?', [clientId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter débitos', error });
    }
});
//------------------------------------------------------painel admin----------------------------------------------------------
app.post('/api/loguin', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se as credenciais foram fornecidas
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    // Consulta o banco de dados para encontrar o usuário
    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], async (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (results.length === 0) {
            // Se não encontrar o usuário
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const user = results[0];

        // Compara a senha fornecida com a senha armazenada no banco (criptografada)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Cria o token JWT
        const token = jwt.sign({ userId: user.id, username: user.username }, 'seu-segredo', { expiresIn: '1h' });

        // Retorna o token para o frontend
        res.json({ token });
    });
});


// Middleware para proteger as rotas e verificar o token JWT
const protectRoute = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer {token}"

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = decoded; // Armazenar as informações do usuário decodificadas
        next(); // Passa para a próxima rota
    });
};

// Middleware para verificar se o usuário é admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Somente administradores.' });
    }
    next(); // Passa para a próxima rota se o usuário for admin
};

// Exemplo de rota protegida (só acessível para admins)
app.get('/admin-dashboard', protectRoute, isAdmin, (req, res) => {
    res.json({ message: 'Bem-vindo ao painel administrativo!', user: req.user });
});

// Exemplo de rota protegida para listar clientes (somente para admin)
app.get('/clients', protectRoute, isAdmin, async (req, res) => {
    try {
        const [clients] = await db.promise().query('SELECT * FROM clients');
        return res.json(clients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar clientes' });
    }
});

// Rota para adicionar um cliente (somente admin)
app.post('/clients', protectRoute, isAdmin, async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        await db.promise().query('INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
        return res.status(201).json({ message: 'Cliente adicionado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
});

// Rota para editar um cliente (somente admin)
app.put('/clients/:id', protectRoute, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    try {
        await db.promise().query('UPDATE clients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, email, phone, address, id]);
        return res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// Rota para deletar um cliente (somente admin)
app.delete('/clients/:id', protectRoute, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await db.promise().query('DELETE FROM clients WHERE id = ?', [id]);
        return res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});
//-------------------------------------------------------------------------ROTA MOTOBOYS ADM ---------------------------


// Rota para listar todos os motoboys
app.get('/api/motoboys', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM motoboys');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar motoboys' });
    }
});

// Rota para criar um novo motoboy
app.post('/api/motoboys', async (req, res) => {
    const { nome, cpf, telefone, status } = req.body;
    try {
        await db.promise().query('INSERT INTO motoboys (nome, cpf, telefone, status) VALUES (?, ?, ?, ?)', [nome, cpf, telefone, status || 'ativo']);
        res.status(201).json({ message: 'Motoboy criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar motoboy' });
    }
});

// Rota para atualizar um motoboy
app.put('/api/motoboys/:id', async (req, res) => {
    const { nome, cpf, telefone, status } = req.body;
    try {
        const [result] = await db.promise().query('UPDATE motoboys SET nome = ?, cpf = ?, telefone = ?, status = ? WHERE id = ?', [nome, cpf, telefone, status, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Motoboy não encontrado' });
        }
        res.json({ message: 'Motoboy atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o motoboy' });
    }
});

// Rota para excluir um motoboy
app.delete('/api/motoboys/:id', async (req, res) => {
    try {
        const [result] = await db.promise().query('DELETE FROM motoboys WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Motoboy não encontrado' });
        }
        res.json({ message: 'Motoboy excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o motoboy' });
    }
});
//-----------------------------------------------------------------------------------------------------------------------------------------------
// ------------------- Inicialização do servidor -------------------
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
