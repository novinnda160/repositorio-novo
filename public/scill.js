document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');
    const deliveryForm = document.getElementById('deliveryForm');
    const deliveryList = document.getElementById('deliveryList');
    const financialList = document.getElementById('financialList');
    const shippingCostDisplay = document.getElementById('costValue');
    const boxSizeInput = document.getElementById('boxSize');

    // Função para calcular custo do frete
    boxSizeInput.addEventListener('input', () => {
        const boxSize = boxSizeInput.value;
        const cost = calculateShippingCost(boxSize);
        shippingCostDisplay.innerText = cost.toFixed(2);
    });

    // Simulação de cálculo de frete
    function calculateShippingCost(size) {
        // Exemplo simples: R$10,00 mais R$2,00 por cm
        return 10 + (2 * size);
    }

    // Adicionar novo cliente
    clientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;

        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        
        if (response.ok) {
            const newClient = await response.json();
            displayClient(newClient);
            clientForm.reset();
        }
    });

    // Exibir cliente na lista
    function displayClient(client) {
        const li = document.createElement('li');
        li.innerText = `${client.name} - ${client.email}`;
        clientList.appendChild(li);
    }

    // Carregar clientes
    async function loadClients() {
        const response = await fetch('/api/clients');
        const clients = await response.json();
        clients.forEach(displayClient);
    }

    // Função para carregar entregas
    async function loadDeliveries() {
        const response = await fetch('/api/deliveries');
        const deliveries = await response.json();
        deliveries.forEach(displayDelivery);
    }

    // Exibir entrega na lista
    function displayDelivery(delivery) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${delivery.orderNumber}</td><td>${delivery.status}</td>`;
        deliveryList.appendChild(tr);
    }

    // Carregar dados ao iniciar
    loadClients();
    loadDeliveries();
});
const clientForm = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');
const boxCalcForm = document.getElementById('boxCalcForm');
const shippingCostDisplay = document.getElementById('shippingCost');
const paymentButton = document.getElementById('payButton');

clientForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const clientData = {
        name: document.getElementById('clientName').value,
        cpf: document.getElementById('clientCPF').value,
        address: document.getElementById('clientAddress').value,
        age: document.getElementById('clientAge').value,
        phone: document.getElementById('clientPhone').value,
        email: document.getElementById('clientEmail').value,
    };

    const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
    });

    if (response.ok) {
        loadClients();
        clientForm.reset();
    } else {
        console.error('Erro ao adicionar cliente');
    }
});

const loadClients = async () => {
    const response = await fetch('http://localhost:5000/api/clients');
    const clients = await response.json();
    clientList.innerHTML = '';

    clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `${client.name} - ${client.cpf}`;
        clientList.appendChild(li);
    });
};

boxCalcForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);

    // Aqui você pode implementar a lógica para calcular o custo do frete
    const shippingCost = (length + width + height) * 2; // Exemplo de cálculo
    shippingCostDisplay.textContent = `Valor do Frete: R$ ${shippingCost.toFixed(2)}`;
});

paymentButton.addEventListener('click', () => {
    const method = document.getElementById('paymentMethod').value;
    alert(`Pagamento realizado via: ${method}`);
});

// Carrega os clientes ao iniciar
loadClients();
