document.addEventListener("DOMContentLoaded", () => {
    const clienteSelect = document.getElementById("cliente");
    const enderecoColetaInput = document.getElementById("enderecoColeta");
    const valorCorridaInput = document.getElementById("valorCorrida");
    const pedidoForm = document.getElementById("pedidoForm");
    const messageElement = document.getElementById("message");

    // Load clients from localStorage
    const clients = JSON.parse(localStorage.getItem("clients")) || [];

    // Populate the client dropdown with saved clients
    function populateClientDropdown() {
        clients.forEach(client => {
            const option = document.createElement("option");
            option.value = client.nome;
            option.textContent = client.nome;
            option.dataset.enderecoColeta = client.enderecoColeta;
            clienteSelect.appendChild(option);
        });
    }

    // Display the pickup address based on selected client
    clienteSelect.addEventListener("change", (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const enderecoColeta = selectedOption.dataset.enderecoColeta || "";

        // Auto-fill the pickup address and calculate a random delivery value
        enderecoColetaInput.value = enderecoColeta;
        valorCorridaInput.value = `R$ ${(Math.random() * (50 - 20) + 20).toFixed(2)}`;
    });

    // Display success message after submitting
    pedidoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Show confirmation message
        messageElement.textContent = "Pedido de entrega solicitado com sucesso!";
        messageElement.className = "alert success";
        messageElement.style.display = "block";

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageElement.style.display = "none";
        }, 3000);

        // Clear the form
        pedidoForm.reset();
        enderecoColetaInput.value = "";
        valorCorridaInput.value = "";
    });

    populateClientDropdown();
});
