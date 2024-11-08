// Função para carregar os clientes no select
async function carregarClientes() {
    try {
        const response = await fetch('/api/clientes'); // Rota para buscar os clientes
        if (!response.ok) throw new Error('Erro na resposta da rede');
        
        const clientes = await response.json();
        const selectCliente = document.getElementById('cliente');

        // Limpar o select antes de carregar os clientes
        selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar clientes', error);
    }
}

// Função para preencher o endereço de coleta baseado no cliente selecionado
async function preencherEnderecoColeta(clienteId) {
    try {
        const response = await fetch(`/api/clientes/${clienteId}`); // Rota para buscar o cliente com o endereço
        if (!response.ok) throw new Error('Erro na resposta da rede');

        const cliente = await response.json();
        const endereco = cliente.endereco_coleta; // Corrigir para 'endereco_coleta'

        if (endereco) {
            // Preenche o campo de endereço de coleta
            document.getElementById('enderecoColeta').value = endereco;
        } else {
            // Caso o endereço não exista
            document.getElementById('enderecoColeta').value = 'Endereço não encontrado';
        }
    } catch (error) {
        console.error('Erro ao buscar endereço de coleta', error);
        document.getElementById('enderecoColeta').value = 'Erro ao buscar endereço';
    }
}

// Função para calcular a distância entre dois endereços e determinar o valor da entrega
async function calcularValorCorrida() {
    const enderecoColeta = document.getElementById('enderecoColeta').value;
    const enderecoEntrega = document.getElementById('enderecoEntrega').value;

    // Verificação se ambos os endereços estão preenchidos
    if (!enderecoColeta || !enderecoEntrega) {
        document.getElementById('valorCorrida').value = 'Por favor, preencha ambos os endereços.';
        return;
    }

    try {
        // URL da API do Google Maps Distance Matrix com os endereços de origem e destino
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${enderecoColeta}&destinations=${enderecoEntrega}&key=SUA_API_KEY`);

        if (!response.ok) throw new Error('Erro ao acessar a API de distância');

        const data = await response.json();

        // Verificar se a API retornou a distância corretamente
        const distanciaKm = data.rows[0].elements[0].distance ? data.rows[0].elements[0].distance.value / 1000 : 0; // Distância em km

        // Se não houver distância calculada, informar erro
        if (distanciaKm === 0) {
            document.getElementById('valorCorrida').value = 'Erro ao calcular a distância';
            return;
        }

        // Calcular o valor da corrida: R$2 por km
        const valorCorrida = distanciaKm * 2; 

        // Exibir o valor da corrida com o formato adequado
        document.getElementById('valorCorrida').value = `R$ ${valorCorrida.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao calcular valor da corrida', error);
        document.getElementById('valorCorrida').value = 'Erro ao calcular o valor da corrida';
    }
}

// Inicializando a página
document.addEventListener('DOMContentLoaded', () => {
    carregarClientes(); // Carregar os clientes no select

    // Adicionar evento de alteração no cliente selecionado
    document.getElementById('cliente').addEventListener('change', (e) => {
        const clienteId = e.target.value;
        if (clienteId) {
            preencherEnderecoColeta(clienteId); // Preencher o endereço de coleta ao selecionar o cliente
        }
    });

    // Adicionar evento de digitação no endereço de entrega
    document.getElementById('enderecoEntrega').addEventListener('input', calcularValorCorrida); // Calcular o valor da corrida ao digitar o endereço de entrega
});
