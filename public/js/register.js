document.getElementById('registerClientForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const endereco = document.getElementById('endereco').value;
    const cnpjCpf = document.getElementById('cnpjCpf').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Enviar os dados para o backend
    fetch('/api/register-client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomeCompleto, endereco, cnpjCpf, email, telefone })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar. Tente novamente.');
        }
        return response.json();
    })
    .then(data => {
        // Mensagem de sucesso
        document.getElementById('registerSuccess').innerText = 'Cliente registrado com sucesso!';
        document.getElementById('registerError').innerText = ''; // Limpa mensagens de erro
        // Limpa o formulário
        document.getElementById('registerClientForm').reset();
    })
    .catch(error => {
        // Mensagem de erro
        document.getElementById('registerError').innerText = error.message;
        document.getElementById('registerSuccess').innerText = ''; // Limpa mensagens de sucesso
    });
});
document.getElementById('registerAdminForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio do formulário para evitar o recarregamento da página

    // Coleta os dados do formulário
    const nome = document.getElementById('adminNome').value;
    const email = document.getElementById('adminEmail').value;
    const senha = document.getElementById('adminSenha').value;

    // Cria o objeto de dados para enviar para o servidor
    const data = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Envia os dados para o backend
    fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cadastro enviado para revisão por e-mail!');
            // Redireciona para uma página de confirmação ou limpa o formulário
            window.location.href = '/confirmacao.html';  // Exemplo de redirecionamento
        } else {
            document.getElementById('registerError').innerText = 'Erro ao enviar os dados. Tente novamente.';
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        document.getElementById('registerError').innerText = 'Erro ao enviar os dados. Tente novamente.';
    });
});

