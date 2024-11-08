document.addEventListener("DOMContentLoaded", () => {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");
    const messageDiv = document.getElementById("message");

    // Carregar todos os clientes
    async function loadClients() {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) throw new Error(`Erro ${response.status}: Não foi possível carregar clientes`);
            const clients = await response.json();

            clientList.innerHTML = '';
            clients.forEach(client => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${client.nome}</td>
                    <td>${client.cpf}</td>
                    <td>${client.endereco_coleta}</td>
                    <td>${client.status}</td>
                    <td>
                        <button class="edit-btn" data-id="${client.id}">Editar</button>
                        <button class="delete-btn" data-id="${client.id}">Excluir</button>
                    </td>
                `;
                clientList.appendChild(row);
            });

            // Adicionar listeners para botões de editar e excluir
            const editButtons = document.querySelectorAll('.edit-btn');
            editButtons.forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
            messageDiv.textContent = "Erro ao carregar clientes.";
            messageDiv.classList.add('error');
        }
    }

    // Criar ou editar um cliente
    clientForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const clientId = document.getElementById("clientId").value;
        const nome = document.getElementById("nome").value;
        const cpf = document.getElementById("cpf").value;
        const endereco_coleta = document.getElementById("endereco_coleta").value;
        const status = document.getElementById("status").value;

        const clientData = { nome, cpf, endereco_coleta, status };

        try {
            let response;
            if (clientId) {
                // Atualizar cliente existente
                response = await fetch(`http://localhost:3000/api/clientes/${clientId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData),
                });
                if (!response.ok) throw new Error('Erro ao atualizar cliente');
                messageDiv.textContent = "Cliente atualizado com sucesso!";
                messageDiv.classList.remove('error');
                messageDiv.classList.add('success');
            } else {
                // Criar novo cliente
                response = await fetch('http://localhost:3000/api/clientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData),
                });
                if (!response.ok) throw new Error('Erro ao criar cliente');
                messageDiv.textContent = "Cliente criado com sucesso!";
                messageDiv.classList.remove('error');
                messageDiv.classList.add('success');
            }
            loadClients();
            clientForm.reset();
            document.getElementById("clientId").value = '';
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            messageDiv.textContent = "Erro ao salvar cliente.";
            messageDiv.classList.remove('success');
            messageDiv.classList.add('error');
        }
    });

    // Editar um cliente
    function handleEdit(event) {
        const clientId = event.target.dataset.id;
        const row = event.target.closest('tr');
        const nome = row.children[0].textContent;
        const cpf = row.children[1].textContent;
        const endereco_coleta = row.children[2].textContent;
        const status = row.children[3].textContent;

        document.getElementById("clientId").value = clientId;
        document.getElementById("nome").value = nome;
        document.getElementById("cpf").value = cpf;
        document.getElementById("endereco_coleta").value = endereco_coleta;
        document.getElementById("status").value = status;
    }

    // Deletar um cliente
    async function handleDelete(event) {
        const clientId = event.target.dataset.id;
        try {
            const response = await fetch(`http://localhost:3000/api/clientes/${clientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao excluir cliente');
            loadClients();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            messageDiv.textContent = "Erro ao excluir cliente.";
            messageDiv.classList.remove('success');
            messageDiv.classList.add('error');
        }
    }

    loadClients(); // Carregar a lista de clientes ao iniciar
});
