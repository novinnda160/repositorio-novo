document.getElementById('corridaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura valores do formulário
    const corridaId = document.getElementById('corridaId').value;
    const cliente = document.getElementById('cliente').value;
    const data = document.getElementById('data').value;
    const localColeta = document.getElementById('localColeta').value;
    const localEntrega = document.getElementById('localEntrega').value;

    const corrida = {
        id: corridaId || Date.now(), // ID gerado automaticamente
        cliente,
        data,
        localColeta,
        localEntrega
    };

    // Verifica se é uma criação ou edição
    if (corridaId) {
        atualizarCorrida(corrida);
    } else {
        criarCorrida(corrida);
    }

    // Limpa o formulário
    document.getElementById('corridaForm').reset();
    document.getElementById('corridaId').value = '';
    exibirCorridas();
});

function criarCorrida(corrida) {
    const corridas = obterCorridas();
    corridas.push(corrida);
    salvarCorridas(corridas);
}

function atualizarCorrida(corridaAtualizada) {
    const corridas = obterCorridas().map(corrida =>
        corrida.id == corridaAtualizada.id ? corridaAtualizada : corrida
    );
    salvarCorridas(corridas);
}

function excluirCorrida(id) {
    const corridas = obterCorridas().filter(corrida => corrida.id != id);
    salvarCorridas(corridas);
    exibirCorridas();
}

function editarCorrida(id) {
    const corrida = obterCorridas().find(corrida => corrida.id == id);
    if (corrida) {
        document.getElementById('corridaId').value = corrida.id;
        document.getElementById('cliente').value = corrida.cliente;
        document.getElementById('data').value = corrida.data;
        document.getElementById('localColeta').value = corrida.localColeta;
        document.getElementById('localEntrega').value = corrida.localEntrega;
    }
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
        `;

        // Criar botão Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editarCorrida(corrida.id));

        // Criar botão Excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => excluirCorrida(corrida.id));

        // Adicionar os botões na célula de ações
        const actionCell = document.createElement('td');
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

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
