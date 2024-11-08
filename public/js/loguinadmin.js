document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Impede o comportamento padrão do formulário

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Limpa mensagens de erro antes de tentar o login
            errorMessage.textContent = '';

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error('Credenciais inválidas');
                }

                const data = await response.json();

                if (data.success) {
                    // Redireciona para home.html após o login bem-sucedido
                    window.location.href = '/admin.html'; // Mude conforme necessário
                } else {
                    errorMessage.textContent = 'Erro no login. Tente novamente.';
                }

            } catch (error) {
                console.error('Erro ao realizar login:', error);
                errorMessage.textContent = 'Erro ao realizar login: ' + error.message;
            }
        });
    }
});
