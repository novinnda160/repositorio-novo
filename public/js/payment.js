// Função para obter clientes do localStorage
function obterClientes() {
    return JSON.parse(localStorage.getItem('clientes')) || [];
}

// Função para obter faturas de um cliente específico
function obterFaturas(clienteId) {
    const faturas = JSON.parse(localStorage.getItem('faturas')) || {};
    return faturas[clienteId] || [];
}

// Função para salvar faturas no localStorage
function salvarFaturas(clienteId, novasFaturas) {
    const faturas = JSON.parse(localStorage.getItem('faturas')) || {};
    faturas[clienteId] = novasFaturas;
    localStorage.setItem('faturas', JSON.stringify(faturas));
}

// Função para preencher o select com os clientes
function preencherClientes() {
    const clienteSelect = document.getElementById('clienteSelect');
    const clientes = obterClientes();

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });
}

// Exibir faturas do cliente selecionado
function exibirFaturas(clienteId) {
    const faturamentosContainer = document.getElementById('faturamentosContainer');
    const faturamentosTableBody = document.getElementById('faturamentosTable').querySelector('tbody');
    faturamentosTableBody.innerHTML = '';

    if (clienteId) {
        const faturas = obterFaturas(clienteId);
        faturas.forEach(fatura => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${fatura.id}</td>
                <td>R$ ${fatura.valor.toFixed(2)}</td>
                <td>${fatura.vencimento}</td>
                <td>${fatura.status}</td>
            `;

            const actionCell = document.createElement('td');
            const pagarButton = document.createElement('button');
            pagarButton.textContent = 'Pagar';
            pagarButton.addEventListener('click', () => pagarFatura(clienteId, fatura.id));
            actionCell.appendChild(pagarButton);

            row.appendChild(actionCell);
            faturamentosTableBody.appendChild(row);
        });

        faturamentosContainer.style.display = 'block';
    } else {
        faturamentosContainer.style.display = 'none';
    }
}

// Função para pagar fatura e atualizar o status
function pagarFatura(clienteId, faturaId) {
    const faturas = obterFaturas(clienteId);
    const fatura = faturas.find(f => f.id === faturaId);

    if (fatura && fatura.status !== 'Paga') {
        fatura.status = 'Paga';
        salvarFaturas(clienteId, faturas);
        exibirFaturas(clienteId);
        mostrarMensagem('Fatura paga com sucesso!', 'success');
    } else {
        mostrarMensagem('Essa fatura já está paga.', 'info');
    }
}

// Função para gerar nova fatura para o cliente
function gerarFatura(clienteId) {
    const novasFaturas = obterFaturas(clienteId);
    const novaFatura = {
        id: 'F' + Date.now(),
        valor: parseFloat((Math.random() * 100).toFixed(2)), // Valor aleatório para simular uma fatura
        vencimento: new Date().toISOString().split('T')[0],
        status: 'Pendente'
    };
    novasFaturas.push(novaFatura);
    salvarFaturas(clienteId, novasFaturas);
    exibirFaturas(clienteId);
    mostrarMensagem('Nova fatura gerada!', 'success');
}

// Exibir mensagem temporária
function mostrarMensagem(texto, tipo) {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    setTimeout(() => message.textContent = '', 3000);
}

// Exibir opções de pagamento
function exibirOpcoesPagamento() {
    const pagamentoOptions = document.getElementById('pagamentoOptions');
    pagamentoOptions.style.display = 'block';
}

// Evento para quando um cliente é selecionado
document.getElementById('clienteSelect').addEventListener('change', function() {
    const clienteId = this.value;
    exibirFaturas(clienteId);
    if (clienteId) {
        exibirOpcoesPagamento();
    }
});

// Evento para gerar boleto e PIX
document.getElementById('boletoButton').addEventListener('click', function() {
    const clienteId = document.getElementById('clienteSelect').value;
    if (clienteId) {
        gerarFatura(clienteId);
        mostrarMensagem('Boleto gerado com sucesso!', 'success');
    } else {
        mostrarMensagem('Selecione um cliente para gerar o boleto.', 'error');
    }
});

document.getElementById('pixButton').addEventListener('click', function() {
    const clienteId = document.getElementById('clienteSelect').value;
    if (clienteId) {
        gerarFatura(clienteId);
        mostrarMensagem('PIX gerado com sucesso!', 'success');
    } else {
        mostrarMensagem('Selecione um cliente para gerar o PIX.', 'error');
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', preencherClientes);
