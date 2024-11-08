document.getElementById('corridaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura valores do formulário
    const corridaId = document.getElementById('corridaId').value;
    const cliente = document.getElementById('cliente').value;
    const data = document.getElementById('data').value;
    const localColeta = document.getElementById('localColeta').value;
    const localEntrega = document.getElementById('localEntrega').value;

    // Objeto corrida
    const corrida = { id: Date.now(), cliente, data, localColeta, localEntrega };

    // Verifica se é uma criação ou edição
    if (corridaId) {
        atualizarCorrida(corridaId, corrida);
    } else {
        criarCorrida(corrida);
    }

    // Limpa o formulário
    document.getElementById('corridaForm').reset();
    document.getElementById('corridaId').value = '';
});

function criarCorrida(corrida) {
    const corridas = obterCorridas();
    corridas.push(corrida);
    salvarCorridas(corridas);
    exibirCorridas();
}

function atualizarCorrida(id, corridaAtualizada) {
    const corridas = obterCorridas().map(corrida => corrida.id == id ? corridaAtualizada : corrida);
    salvarCorridas(corridas);
    exibirCorridas();
}

function excluirCorrida(id) {
    const corridas = obterCorridas().filter(corrida => corrida.id != id);
    salvarCorridas(corridas);
    exibirCorridas();
}

function editarCorrida(id) {
    const corrida = obterCorridas().find(corrida => corrida.id == id);
    document.getElementById('corridaId').value = corrida.id;
    document.getElementById('cliente').value = corrida.cliente;
    document.getElementById('data').value = corrida.data;
    document.getElementById('localColeta').value = corrida.localColeta;
    document.getElementById('localEntrega').value = corrida.localEntrega;
}

function exibirCorridas() {
    const corridas = obterCorridas();
    const corridaList = document.getElementById('corridaList');
    corridaList.innerHTML = '';

    corridas.forEach(corrida => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${corrida.cliente}</td>
            <td>${corrida.data}</td>
            <td>${corrida.localColeta}</td>
            <td>${corrida.localEntrega}</td>
            <td>
                <button onclick="editarCorrida(${corrida.id})">Editar</button>
                <button onclick="excluirCorrida(${corrida.id})">Excluir</button>
            </td>
        `;
        corridaList.appendChild(row);
    });
}

function obterCorridas() {
    return JSON.parse(localStorage.getItem('corridas')) || [];
}

function salvarCorridas(corridas) {
    localStorage.setItem('corridas', JSON.stringify(corridas));
}

// Exibe as corridas ao carregar a página
document.addEventListener('DOMContentLoaded', exibirCorridas);
const corridaForm = document.getElementById('corridaForm');
const corridaList = document.getElementById('corridaList');
const message = document.getElementById('message');

// Função para listar as corridas do mês
async function listarCorridas() {
    try {
        const response = await fetch('/api/corridas/mes');
        const corridas = await response.json();
        console.log(corridas); // Adicionado para depuração

        corridaList.innerHTML = '';
        corridas.forEach(corrida => {
            corridaList.innerHTML += `
                <tr>
                    <td>${corrida.cliente}</td>
                    <td>${corrida.data}</td>
                    <td>${corrida.localColeta}</td>
                    <td>${corrida.localEntrega}</td>
                    <td>
                        <button onclick="editarCorrida(${corrida.id})">Editar</button>
                        <button onclick="deletarCorrida(${corrida.id})">Deletar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erro ao listar corridas:', error);
    }
}

// Função para adicionar ou editar uma corrida
corridaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const corridaId = document.getElementById('corridaId').value;
    const cliente = document.getElementById('cliente').value;
    const data = document.getElementById('data').value;
    const localColeta = document.getElementById('localColeta').value;
    const localEntrega = document.getElementById('localEntrega').value;

    const corridaData = { cliente, data, localColeta, localEntrega };

    try {
        const response = await fetch(`/api/corridas${corridaId ? `/${corridaId}` : ''}`, {
            method: corridaId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(corridaData)
        });

        const result = await response.json();
        message.textContent = result.message;
        corridaForm.reset();
        listarCorridas();
    } catch (error) {
        console.error('Erro ao salvar corrida:', error);
    }
});

// Função para editar uma corrida
async function editarCorrida(id) {
    try {
        const response = await fetch(`/api/corridas/${id}`);
        const corrida = await response.json();

        document.getElementById('corridaId').value = corrida.id;
        document.getElementById('cliente').value = corrida.cliente;
        document.getElementById('data').value = corrida.data;
        document.getElementById('localColeta').value = corrida.localColeta;
        document.getElementById('localEntrega').value = corrida.localEntrega;
    } catch (error) {
        console.error('Erro ao buscar corrida para edição:', error);
    }
}

// Função para deletar uma corrida
async function deletarCorrida(id) {
    try {
        const response = await fetch(`/api/corridas/${id}`, { method: 'DELETE' });
        const result = await response.json();
        message.textContent = result.message;
        listarCorridas();
    } catch (error) {
        console.error('Erro ao deletar corrida:', error);
    }
}
zz// Inicializa a listagem de corridas
listarCorridas();
