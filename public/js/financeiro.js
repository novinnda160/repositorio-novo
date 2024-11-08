// Função para carregar o faturamento do mês
function loadFaturamento() {
    fetch('http://localhost:3000/api/faturamento') // Chama a API do backend para buscar os dados de faturamento
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(data => {
            console.log('Faturamento recebido:', data);  // Verifica os dados recebidos no console

            const faturamentoList = document.getElementById('faturamentoList');
            faturamentoList.innerHTML = '';  // Limpa a lista de faturamento antes de adicionar os novos itens

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(item.data).toLocaleDateString('pt-BR')}</td>
                    <td>${item.cliente}</td>
                    <td>R$ ${item.valor.toFixed(2)}</td>
                    <td><button onclick="deleteFaturamento(${item.id})">Deletar</button></td>
                `;
                faturamentoList.appendChild(row);
            });

            // Atualiza o total do faturamento
            const totalFaturamento = data.reduce((total, item) => total + item.valor, 0);
            document.getElementById('total-faturamento').innerText = totalFaturamento.toFixed(2);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados de faturamento');
        });
}

// Função para deletar um faturamento
function deleteFaturamento(id) {
    if (confirm('Tem certeza que deseja excluir este faturamento?')) {
        fetch(`http://localhost:3000/api/faturamento/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Faturamento excluído com sucesso');
                loadFaturamento();  // Recarrega a lista de faturamento após excluir
            } else {
                alert('Erro ao excluir faturamento');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir faturamento');
        });
    }
}
