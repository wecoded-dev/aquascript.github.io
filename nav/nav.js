// This script is used to collapse the navbar on mobile devices when a link is clicked.
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        });
    });
});


//This script is used to open social media links in a new tab when clicked.
// The links are inside a div with the class "social-links".
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        window.open(this.href, '_blank');
      });
    });
  });