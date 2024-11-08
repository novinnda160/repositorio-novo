$(document).ready(function() {
    // Função para carregar clientes no dropdown
    const loadClientsForSelect = async () => {
        try {
            const response = await fetch('/api/clients'); // Ajuste a URL aqui
            if (!response.ok) {
                throw new Error(`Erro ao carregar clientes: ${response.statusText}`);
            }
            const clients = await response.json();
            clients.forEach(client => {
                $('#clientSelect').append(`
                    <option value="${client.id}">${client.name}</option>
                `);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            alert('Erro ao carregar clientes.');
        }
    };

    // Chama a função ao carregar a página
    loadClientsForSelect();

    // Evento de submit do formulário de entrega
    $('#deliveryRequestForm').on('submit', async (event) => {
        event.preventDefault(); // Impede o envio normal do formulário
        
        const deliveryData = {
            clientId: $('#clientSelect').val(),
            deliveryAddress: $('#deliveryAddress').val()
        };

        try {
            const response = await fetch('/deliveries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deliveryData)
            });

            if (!response.ok) {
                throw new Error('Erro ao solicitar entrega');
            }

            alert('Entrega solicitada com sucesso!');
            $('#deliveryRequestForm')[0].reset(); // Limpa o formulário
        } catch (error) {
            alert(error.message);
        }
    });
});
