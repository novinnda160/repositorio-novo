document.addEventListener("DOMContentLoaded", () => {
    loadClients();
    document.getElementById("clienteSelect").addEventListener("change", handleClientSelect);
    document.getElementById("boletoButton").addEventListener("click", () => generatePayment("boleto"));
    document.getElementById("pixButton").addEventListener("click", () => generatePayment("pix"));
});

async function loadClients() {
    try {
        const response = await fetch("/api/clientes"); // Atualize a URL da API
        if (!response.ok) throw new Error("Erro ao carregar os clientes.");

        const clients = await response.json();
        const clienteSelect = document.getElementById("clienteSelect");
        
        clients.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = `${cliente.nome} (${cliente.cpf})`;
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        showMessage("Erro ao carregar clientes: " + error.message, "error");
    }
}

async function handleClientSelect() {
    const clientId = document.getElementById("clienteSelect").value;
    if (!clientId) return;

    try {
        const response = await fetch(`/api/faturamento/cliente/${clientId}`); // Atualize a URL da API
        if (!response.ok) throw new Error("Erro ao carregar os faturamentos do cliente.");

        const faturamentos = await response.json();
        const faturamentosContainer = document.getElementById("faturamentosContainer");
        const faturamentosTable = document.getElementById("faturamentosTable").getElementsByTagName("tbody")[0];
        
        faturamentosTable.innerHTML = ""; // Limpa a tabela

        faturamentos.forEach(faturamento => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${faturamento.id}</td>
                <td>${faturamento.valor}</td>
                <td>${faturamento.data_vencimento}</td>
                <td>${faturamento.status}</td>
                <td><button class="payButton" data-id="${faturamento.id}">Pagar</button></td>
            `;
            faturamentosTable.appendChild(row);
        });

        faturamentosContainer.style.display = "block";
        document.getElementById("pagamentoOptions").style.display = "block";
        
        // Chama a função para gerar o boleto automaticamente
        generatePayment("boleto");
    } catch (error) {
        showMessage("Erro ao carregar faturamentos: " + error.message, "error");
    }
}

function generatePayment(method) {
    const clientId = document.getElementById("clienteSelect").value;
    if (!clientId) return showMessage("Selecione um cliente.", "error");

    // Lógica para gerar pagamento (boleto ou PIX)
    if (method === "boleto") {
        showMessage(`Pagamento gerado via boleto para o cliente ${clientId}.`, "success");
        // Aqui você pode chamar sua lógica de backend para gerar o boleto
    } else if (method === "pix") {
        showMessage(`Pagamento gerado via PIX para o cliente ${clientId}.`, "success");
        // Aqui você pode chamar sua lógica de backend para gerar o PIX
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "";
    }, 3000);
}
