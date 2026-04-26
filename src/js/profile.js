const spanNombre = document.getElementById('nombreUsuario');
spanNombre.textContent = sessionStorage.getItem('user_name');

function mostrarPerfil() {
    const divPerfil = document.getElementById('divEditarPerfil');
    divPerfil.style.display="flex";
}

function ocultarPerfil() {
    const divPerfil = document.getElementById('divEditarPerfil');
    divPerfil.style.display="none";
}

function cerrar_sesion() {
    window.location.href = 'index.html';
}