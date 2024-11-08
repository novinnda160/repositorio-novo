$(document).ready(function () {
    // Atualiza a lista de entregas
    function updateDeliveryList() {
        $.get('/api/deliveries', function (deliveries) {
            const deliveryList = $('deliveryList');
            deliveryList.empty();
            deliveries.forEach(delivery => {
                const row = $('<tr></tr>');
                row.append(`<td>${delivery.id}</td>`);
                row.append(`<td>${delivery.clientName}</td>`);
                row.append(`<td>${delivery.address}</td>`);
                row.append(`<td><button class="btn btn-danger" data-id="${delivery.id}">Remover</button></td>`);
                deliveryList.append(row);
            });
        });
    }

    // Atualiza a lista de clientes
    function updateClientList() {
        $.get('/api/clients', function (clients) {
            const clientList = $('clientList');
            const clientSelect = $('clientSelect');
            clientList.empty();
            clientSelect.empty().append('<option value="">Selecione um cliente</option>');
            clients.forEach(client => {
                const row = $('<tr></tr>');
                row.append(`<td>${client.name}</td>`);
                row.append(`<td>${client.cpf}</td>`);
                row.append(`<td>${client.address}</td>`);
                row.append(`<td><button class="btn btn-danger" data-id="${client.id}">Remover</button></td>`);
                clientList.append(row);
                clientSelect.append(`<option value="${client.id}">${client.name}</option>`);
            });
        });
    }

    // Atualiza a lista de pedidos
    async function listarPedidos() {
        try {
            const response = await fetch('http://localhost:3000/api/orders');
            const pedidos = await response.json();
            const pedidosContainer = $('#pedidos'); // Certifique-se de ter um elemento com este ID no seu HTML

            pedidosContainer.empty(); // Limpa a lista existente

            pedidos.forEach(pedido => {
                const pedidoElement = $('<div></div>');
                pedidoElement.append(`
                    <p>ID do Pedido: ${pedido.id}</p>
                    <p>Status: ${pedido.status}</p>
                    <button class="btn btn-success" onclick="aceitarPedido(${pedido.id})">Aceitar Pedido</button>
                `);
                pedidosContainer.append(pedidoElement);
            });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
        }
    }

    // Aceitar pedido
    async function aceitarPedido(orderId) {
        try {
            const response = await fetch('http://localhost:3000/api/accept-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId }),
            });

            if (response.ok) {
                alert('Pedido aceito com sucesso!');
                listarPedidos(); // Atualiza a lista de pedidos após aceitação
            } else {
                alert('Erro ao aceitar o pedido.');
            }
        } catch (error) {
            console.error('Erro ao aceitar pedido:', error);
            alert('Erro ao enviar o pedido.');
        }
    }

    // Manipulador de evento para o formulário de entrega
    $('#deliveryRequestForm').on('submit', function (event) {
        event.preventDefault();
        const clientId = $('#clientSelect').val();
        const deliveryAddress = $('#deliveryAddress').val();

        $.post('/api/deliveries', { clientId, address: deliveryAddress })
            .done(function () {
                updateDeliveryList(); // Atualiza a lista de entregas
                $('#deliveryRequestForm')[0].reset(); // Limpa o formulário
            });
    });

    // Manipulador de evento para o formulário de clientes
    $('#clientRequestForm').on('submit', function (event) {
        event.preventDefault();
        const clientName = $('#clientName').val();
        const clientCpf = $('#clientCpf').val();
        const clientAddress = $('#clientAddress').val();

        $.post('/api/clients', { name: clientName, cpf: clientCpf, address: clientAddress })
            .done(function () {
                updateClientList(); // Atualiza a lista de clientes
                $('#clientRequestForm')[0].reset(); // Limpa o formulário
            });
    });

    // Manipulador de evento para o cálculo de frete
    $('#boxCalcForm').on('submit', function (event) {
        event.preventDefault();
        const length = parseFloat($('#length').val());
        const width = parseFloat($('#width').val());
        const height = parseFloat($('#height').val());

        // Cálculo fictício de frete
        const shippingCost = (length * width * height) * 0.01; // Exemplo de cálculo
        $('#shippingCostDisplay').text(`Custo de Frete: R$ ${shippingCost.toFixed(2)}`);
    });

    // Manipulador de evento para gerar o QR Code
    $('#generatePix').on('click', function () {
        const deliveryId = $('#deliveryId').val();
        const pixUrl = `https://yourbackend.com/pix?deliveryId=${deliveryId}`; // Alterar para a URL real do seu backend
        $('#qrcode').empty().qrcode(pixUrl);
    });

    // Inicializa as listas
    updateDeliveryList();
    updateClientList();
    listarPedidos(); // Chama a função para listar pedidos na inicialização
});
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('seuBotao');
    button.addEventListener('click', function() {
        // seu código aqui
    });
});
