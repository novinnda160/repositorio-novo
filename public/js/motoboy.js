document.addEventListener('DOMContentLoaded', () => {
    const motoboyForm = document.getElementById('motoboyForm');
    const motoboyList = document.getElementById('motoboyList');

    // Função para adicionar um motoboy
    motoboyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const status = document.getElementById('status').value;

        try {
            const response = await fetch('http://localhost:3000/api/motoboys', { // Certifique-se de que a URL está correta
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, cpf, telefone, status })
            });

            if (response.ok) {
                alert('Motoboy adicionado com sucesso');
                motoboyForm.reset();
                listarMotoboys();
            } else {
                alert('Erro ao adicionar motoboy');
            }
        } catch (error) {
            console.error('Erro ao adicionar motoboy:', error);
        }
    });

    // Função para listar motoboys
    async function listarMotoboys() {
        try {
            const response = await fetch('http://localhost:3000/api/motoboys'); // URL correta
            const motoboys = await response.json();

            motoboyList.innerHTML = '';
            motoboys.forEach((motoboy) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${motoboy.nome}</td>
                    <td>${motoboy.cpf}</td>
                    <td>${motoboy.telefone}</td>
                    <td>${motoboy.status}</td>
                    <td>
                        <button onclick="deletarMotoboy(${motoboy.id})">Excluir</button>
                        <button onclick="editarMotoboy(${motoboy.id})">Editar</button>
                    </td>
                `;
                motoboyList.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao listar motoboys:', error);
        }
    }

    // Função para deletar um motoboy
    async function deletarMotoboy(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/motoboys/${id}`, { // URL correta
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Motoboy excluído com sucesso');
                listarMotoboys();
            } else {
                alert('Erro ao excluir motoboy');
            }
        } catch (error) {
            console.error('Erro ao excluir motoboy:', error);
        }
    }

    // Função para editar um motoboy
    async function editarMotoboy(id) {
        // Aqui você pode adicionar a lógica para editar o motoboy (abrir um modal ou redirecionar)
        console.log('Editar motoboy:', id);
    }

    listarMotoboys();
});
