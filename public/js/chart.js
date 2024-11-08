document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa o gráfico de faturamento
    const ctx = document.getElementById('financeGraph').getContext('2d');
    const financeGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // As labels serão atualizadas dinamicamente
            datasets: [{
                label: 'Faturamento',
                data: [], // Os dados serão atualizados dinamicamente
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Função para obter dados do backend
    async function fetchData() {
        const response = await fetch('/api/dashboard');
        const data = await response.json();

        // Atualiza o gráfico de faturamento
        financeGraph.data.labels = data.months; // Meses do faturamento
        financeGraph.data.datasets[0].data = data.revenue; // Dados do faturamento
        financeGraph.update();

        // Atualiza total de corridas
        document.getElementById('totalCorridas').textContent = data.totalRides;

        // Atualiza faturamento total
        document.getElementById('faturamento').textContent = `R$ ${data.totalRevenue.toFixed(2)}`;

        // Atualiza gastos com motoboys
        document.getElementById('gastosMotoboys').textContent = `R$ ${data.totalMotoboyExpenses.toFixed(2)}`;
    }

    // Função para carregar e atualizar a tabela de clientes
    async function loadClientes() {
        const response = await fetch('/api/clientes');
        const clientes = await response.json();

        const clientesTableBody = document.getElementById('clientesTableBody');
        clientesTableBody.innerHTML = ''; // Limpa a tabela

        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>
                    <button onclick="editCliente(${cliente.id})">Editar</button>
                    <button onclick="deleteCliente(${cliente.id})">Excluir</button>
                </td>
            `;
            clientesTableBody.appendChild(row);
        });
    }

    // Função para carregar e atualizar a tabela de motoboys
    async function loadMotoboys() {
        const response = await fetch('/api/motoboys');
        const motoboys = await response.json();

        const motoboysTableBody = document.getElementById('motoboysTableBody');
        motoboysTableBody.innerHTML = ''; // Limpa a tabela

        motoboys.forEach(motoboy => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${motoboy.id}</td>
                <td>${motoboy.nome}</td>
                <td>${motoboy.email}</td>
                <td>
                    <button onclick="editMotoboy(${motoboy.id})">Editar</button>
                    <button onclick="deleteMotoboy(${motoboy.id})">Excluir</button>
                </td>
            `;
            motoboysTableBody.appendChild(row);
        });
    }

    // Função para edição de clientes
    window.editCliente = (id) => {
        // Lógica para editar cliente (abrir modal ou redirecionar)
    };

    // Função para exclusão de clientes
    window.deleteCliente = async (id) => {
        await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
        loadClientes(); // Atualiza a tabela após exclusão
    };

    // Função para edição de motoboys
    window.editMotoboy = (id) => {
        // Lógica para editar motoboy (abrir modal ou redirecionar)
    };

    // Função para exclusão de motoboys
    window.deleteMotoboy = async (id) => {
        await fetch(`/api/motoboys/${id}`, { method: 'DELETE' });
        loadMotoboys(); // Atualiza a tabela após exclusão
    };

    // Chamadas iniciais
    await fetchData();
    await loadClientes();
    await loadMotoboys();

    // Atualização em tempo real (usando WebSockets ou setInterval)
    setInterval(async () => {
        await fetchData();
        await loadClientes();
        await loadMotoboys();
    }, 5000); // Atualiza a cada 5 segundos

    // Logout
    document.querySelector('.logout-btn').addEventListener('click', logout);
});

async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
}
