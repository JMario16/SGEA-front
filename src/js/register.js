const registerBtn = document.getElementById('registerBtn');

async function register() {

    // Obtener valores del formulario
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validaciones
    if (!username || !email || !password || !confirmPassword) {
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (!termsAccepted) {
        return;
    }

    // Cambiar estado del botón
    registerBtn.disabled = true;
    registerBtn.textContent = 'Creando cuenta...';

    try {
        const response = await fetch('https://sgea.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('¡Cuenta creada exitosamente! Redirigiendo a inicio de sesión...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            alert('Error al crear la cuenta: ' + (data.message || 'Error desconocido'));
            registerBtn.disabled = false;
            registerBtn.textContent = 'Crear cuenta';
        }
    } catch (error) {
        alert('Error de conexión. Intenta nuevamente.');
        registerBtn.disabled = false;
        registerBtn.textContent = 'Crear cuenta';
    }
}