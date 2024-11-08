document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navbarCollapse = document.getElementById('navbar-collapse');

    hamburger.addEventListener('click', function() {
        navbarCollapse.classList.toggle('active');
    });
});
