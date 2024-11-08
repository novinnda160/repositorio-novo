// Aguardar o carregamento completo do conteúdo
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  // Toggle para abrir/fechar o menu em dispositivos móveis
  menuToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('show');
      menuToggle.classList.toggle('active');
  });

  // Adicionar rolagem suave nos links do menu
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 60, // Ajuste para a altura do menu fixo
                  behavior: 'smooth'
              });
          }

          // Fechar o menu em telas pequenas após o clique
          navbarMenu.classList.remove('show');
          menuToggle.classList.remove('active');
      });
  });
});
