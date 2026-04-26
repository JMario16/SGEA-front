const academicBtn = document.getElementById('academicBtn');

async function save_academic() {

    // Obtener valores del formulario
    const institucion = document.getElementById('institucion').value;
    const carrera = document.getElementById('carrera').value;
    const semestre = document.getElementById('semestre').value;
    const promedio = document.getElementById('promedio').value;

    if (!institucion || !carrera || !semestre) {
        return;
    }

    academicBtn.disabled = true;
    academicBtn.textContent = 'Guardando...';

    // Lógica de envío (fetch)
    try {
        const response = await fetch('https://sgea.onrender.com/perfil/academico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                institucion: institucion,
                carrera: carrera,
                semestre: semestre,
                promedio_general: promedio
            })
        });

        const data = await response.json();

        if (response.ok) {
            setTimeout(() => {
                window.location.href = 'onboarding_2.html';
            }, 1500);
        } else {
            alert('Error al guardar: ' + (data.message || 'Error desconocido'));
            academicBtn.disabled = false;
            academicBtn.textContent = 'Siguiente';
        }
    } catch (error) {
        alert('Error de conexión. Intenta nuevamente.');
        academicBtn.disabled = false;
        academicBtn.textContent = 'Siguiente';
    }
}