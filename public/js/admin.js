// Captura o formulário de login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

// Lidar com a submissão do formulário
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio normal do formulário

    // Obtém os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se os campos estão preenchidos
    if (!username || !password) {
        errorMessage.textContent = 'Por favor, preencha todos os campos.';
        errorMessage.style.display = 'block';
        return;
    }

    // Envia a solicitação de login para o backend
    try {
        const response = await fetch('http://localhost:5000/api/loguin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // Armazena o token no localStorage
            localStorage.setItem('token', data.token);

            // Redireciona para a página admin.html após login
            window.location.href = 'admin.html';
        } else {
            // Caso a resposta seja negativa, exibe uma mensagem de erro
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Usuário ou senha inválidos';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        // Caso ocorra algum erro com a solicitação
        console.error('Erro ao tentar fazer login:', error);
        errorMessage.textContent = 'Erro ao conectar com o servidor';
        errorMessage.style.display = 'block';
    }
});
