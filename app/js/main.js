const menuNav = document.querySelector('.menu');
const menuBurger = document.querySelector('.burger');
const menuClose = document.querySelector('.menu__close');
const logo = document.querySelector('.header__logo');

// menuClose
const toggleMenu = function () {
    menuNav.classList.toggle('menu__show');
    logo.classList.toggle('header__logo-none')
}

menuBurger.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener('click', function (e) {
    const target = e.target;
    const its_menu = target == menuNav || menuNav.contains(target);
    const its_btnMenu = target == menuBurger;
    const menu_is_active = menuNav.classList.contains('menu__show');

    if (!its_menu && !its_btnMenu && menu_is_active) {
        toggleMenu();
    }
});
if (menuClose) {
  menuClose.addEventListener('click', function() {
    menuNav.classList.remove('menu__show');
    logo.classList.remove('header__logo-none')
  })
}

// Anchors
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// SweetAlert2 library
const emailSendBtn = document.querySelectorAll('.request__btn');
emailSendBtn.forEach(function(element) {
  element.addEventListener('click', function() {
    Swal.fire({
      title: 'Write your email',
      showCancelButton: true,
      input: 'email',
      inputLabel: 'And we will contact you',
      inputPlaceholder: 'Enter your email address',
      confirmButtonText: 'Send',
      confirmButtonColor: '#a5a9f2',
      cancelButtonColor: '#ccc'
    });
  })
})
