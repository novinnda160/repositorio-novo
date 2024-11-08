$(document).ready(function() {
    // Efeito de rolagem suave para os links do menu
    $('a.nav-link').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 800);
    });

    // Animação ao carregar imagens
    $('.img-animated').hover(function() {
        $(this).addClass('rotate');
    });
});
