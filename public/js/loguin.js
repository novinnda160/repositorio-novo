document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegue os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Defina as credenciais do admin no código
    const adminUsername = 'alevar2024';
    const adminPassword = 'alevar2024';

    // Verifique se as credenciais estão corretas
    if (username === adminUsername && password === adminPassword) {
        // Se as credenciais forem corretas, armazene o token e redirecione
        localStorage.setItem('token', 'fake-jwt-token');  // Armazene um token fictício no localStorage
        window.location.href = 'admin.html';  // Redireciona para a página de admin
    } else {
        // Se as credenciais estiverem erradas, exiba uma mensagem de erro
        alert('Usuário ou senha inválidos!');
    }
});
