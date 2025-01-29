const nav = document.querySelector('.nav');
const menu_btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu')
//variables filtrado
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
//variables del filtro formulario
const form = document.getElementById('contactForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

const nombreError = document.getElementById('nombreError');
const emailError = document.getElementById('emailError');
const asuntoError = document.getElementById('asuntoError');
const mensajeError = document.getElementById('mensajeError');

// Funcionalidad de filtrado
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        cards.forEach(card => {
            if (filterValue === 'todos') {
                card.style.display = 'block';
            } else if (card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Efecto de scroll suave para los enlaces de navegación (los que comienzan con #)

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Obtener el href del enlace
        const href = this.getAttribute('href');
        
        // Verificar si el enlace es interno (comienza con #)
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Si no comienza con #, dejará que el enlace funcione normalmente
        // permitiendo la navegación a otras páginas
    });
});


//parte para haccer que menu se ponga blanco al bajar
window.addEventListener('scroll',function(){
    nav.classList.toggle('active',window.scrollY > 0)
})


menu_btn.addEventListener('click', () =>{
    menu.classList.toggle('active')
})

//filtrado formulario

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validación nombre
    if (nombre.value.trim() === '') {
        nombreError.style.display = 'block';
        isValid = false;
    } else {
        nombreError.style.display = 'none';
    }

    // Validación email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validación asunto
    if (asunto.value.trim() === '') {
        asuntoError.style.display = 'block';
        isValid = false;
    } else {
        asuntoError.style.display = 'none';
    }

    // Validación mensaje
    if (mensaje.value.trim() === '') {
        mensajeError.style.display = 'block';
        isValid = false;
    } else {
        mensajeError.style.display = 'none';
    }

    if (isValid) {
        alert('Mensaje enviado correctamente!');
        form.reset();
    }
});

