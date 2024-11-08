document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
        endereco: document.getElementById('endereco').value,
        cidadeUF: document.getElementById('cidadeUF').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        nomeResponsavel: document.getElementById('nomeResponsavel').value,
        cpfResponsavel: document.getElementById('cpfResponsavel').value,
        telefoneResponsavel: document.getElementById('telefoneResponsavel').value,
        emailResponsavel: document.getElementById('emailResponsavel').value,
    };

    fetch('/api/update-profile', { // Substitua pela sua rota
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Dados atualizados com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
