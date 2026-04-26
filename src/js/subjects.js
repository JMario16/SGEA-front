const spanNombre = document.getElementById('nombreUsuario');
spanNombre.textContent = sessionStorage.getItem('user_name');

function mostrarCrear() {
    const divCrear = document.getElementById('divCrearMateria');
    divCrear.style.display="flex";
}

function ocultarCrear() {
    const divCrear = document.getElementById('divCrearMateria');
    divCrear.style.display="none";
}

function cerrar_sesion() {
    window.location.href = 'index.html';
}