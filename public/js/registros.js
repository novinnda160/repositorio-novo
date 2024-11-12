document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário para não recarregar a página

        // Pegando os dados do formulário
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Verificando se as senhas coincidem
        if (password !== confirmPassword) {
            document.getElementById('error-message').textContent = 'As senhas não coincidem!';
            return;
        }

        // Criando um objeto com os dados do usuário
        const user = {
            name: name,
            email: email,
            password: password
        };

        // Recuperando os usuários armazenados no localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificando se o email já está registrado
        if (users.some(existingUser => existingUser.email === email)) {
            document.getElementById('error-message').textContent = 'Este email já está registrado!';
            return;
        }

        // Adicionando o novo usuário ao array de usuários
        users.push(user);

        // Salvando os usuários no localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Mensagem de sucesso (opcional)
        alert("Registro concluído com sucesso!");

        // Redirecionando para a página de login após o registro
        window.location.href = 'login.html';
    });
});
