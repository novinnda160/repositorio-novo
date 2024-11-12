document.addEventListener("DOMContentLoaded", () => {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");

    let clients = JSON.parse(localStorage.getItem("clients")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("clients", JSON.stringify(clients));
    }

    function renderClients() {
        clientList.innerHTML = "";
        clients.forEach((client, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${client.nome}</td>
                <td>${client.cpf}</td>
                <td>${client.endereco_coleta}</td>
                <td>${client.status}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Editar</button>
                    <button class="deleteBtn" data-index="${index}">Deletar</button>
                </td>
            `;

            clientList.appendChild(row);
        });
    }

    function addClient(client) {
        clients.push(client);
        saveToLocalStorage();
        renderClients();
    }

    function deleteClient(index) {
        clients.splice(index, 1);
        saveToLocalStorage();
        renderClients();
    }

    function editClient(index) {
        const client = clients[index];
        document.getElementById("clientId").value = index;
        document.getElementById("nome").value = client.nome;
        document.getElementById("cpf").value = client.cpf;
        document.getElementById("endereco_coleta").value = client.endereco_coleta;
        document.getElementById("status").value = client.status;
    }

    clientForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const clientId = document.getElementById("clientId").value;
        const newClient = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            endereco_coleta: document.getElementById("endereco_coleta").value,
            status: document.getElementById("status").value,
        };

        if (clientId) {
            clients[clientId] = newClient; // Update existing client
        } else {
            addClient(newClient); // Add new client
        }

        saveToLocalStorage();
        renderClients();
        clientForm.reset();
        document.getElementById("clientId").value = "";
    });

    clientList.addEventListener("click", (e) => {
        if (e.target.classList.contains("editBtn")) {
            editClient(e.target.dataset.index);
        } else if (e.target.classList.contains("deleteBtn")) {
            deleteClient(e.target.dataset.index);
        }
    });

    // Initial render
    renderClients();
});
