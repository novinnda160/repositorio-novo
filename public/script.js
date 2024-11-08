










// Função para efeito de rolagem suave ao clicar em links do menu
document.querySelectorAll('.navbar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Efeito de luzes animadas no fundo
  const lights = document.querySelector('.background-lights');
  let xPosition = 0;
  let yPosition = 0;
  
  function moveLights() {
    xPosition += 0.3; // Velocidade de movimento no eixo X
    yPosition += 0.3; // Velocidade de movimento no eixo Y
    lights.style.backgroundPosition = `${xPosition}px ${yPosition}px`;
    requestAnimationFrame(moveLights);
  }
  moveLights();
  
  // Animação de aparição no banner com efeito de opacidade
  const bannerContent = document.querySelector('.banner-content');
  window.addEventListener('load', () => {
    bannerContent.style.opacity = 1;
    bannerContent.style.transform = 'translateY(0)';
  });
  
  // Transição ao rolar - animações no conteúdo ao aparecer na tela
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });
  
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
  