// Função que lida com o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário para não recarregar a página

    // Pegando os dados do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Recuperando os usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log("Usuários armazenados:", users); // Verifique no console se os dados estão corretos

    // Verificando se o usuário existe e se a senha está correta
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Se o usuário for encontrado, redireciona para a página home
        window.location.href = 'home.html';
    } else {
        // Se o login falhar, exibe uma mensagem de erro
        document.getElementById('error-message').textContent = 'Email ou senha incorretos!';
    }
});
