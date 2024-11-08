// auth.js

// Função para registrar um novo usuário
async function registerUser() {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            window.location.href = '/login'; // Redireciona para a página de login
        } else {
            const error = await response.text();
            alert('Erro ao registrar: ' + error);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para logar um usuário
async function loginUser() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Login realizado com sucesso!');
            window.location.href = '/home'; // Redireciona para a página inicial
        } else {
            const error = await response.text();
            alert('Erro ao fazer login: ' + error);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Adiciona os listeners aos formulários
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        registerUser();
    });
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        loginUser();
    });
}
