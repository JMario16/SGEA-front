import { getUserNameFromToken, getJwtPayload } from "../main";

const loginBtn = document.getElementById('loginBtn');

async function login() {

    // Obtener valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validaciones
    if (!email || !password) {
        return;
    }

    // Cambiar estado del botón
    loginBtn.disabled = true;
    loginBtn.textContent = 'Espere...';

    try {
        const response = await fetch('https://sgea.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            if (!sessionStorage.getItem('inicio_sesion')) {
                sessionStorage.setItem('inicio_sesion', 'true');

                alert('Abriendo sesión...');
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('refresh_token', data.refresh_token);
                sessionStorage.setItem('user_name', getUserNameFromToken(data.access_token))
                
                setTimeout(() => {
                    window.location.href = 'onboarding_1.html';
                }, 1500);
            } else {
                alert('Abriendo sesión...');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        } else {
            alert('Error al iniciar sesión: ' + (data.message || 'Error desconocido'));
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar sesión';
        }
    } catch (error) {
        alert('Error de conexión. Intenta nuevamente.');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Iniciar sesión';
    }
}