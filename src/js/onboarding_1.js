const academicBtn = document.getElementById('academicBtn');

async function upload_default_avatar() {
    try {
        // 1. Obtener la imagen desde assets
        const response = await fetch('/assets/user_avatar.png');
        const blob = await response.blob();

        // 2. Convertir a archivo (como si el usuario lo hubiera subido)
        const file = new File([blob], 'default.png', { type: blob.type });

        // 3. Crear FormData
        const formData = new FormData();
        formData.append('file', file);

        // 4. Enviar al backend
        const res = await fetch('https://sgea.onrender.com/perfil/avatar', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            }
        });

        if (!res.ok) {
            console.error('Error al subir avatar:', res.status);
            return false;
        }

        const data = await res.json();
        console.log('Avatar subido:', data);
        return true;

    } catch (error) {
        console.error('Error al subir avatar:', error);
        return false;
    }
}

async function save_academic() {

    // Obtener valores del formulario
    const institucion = document.getElementById('institucion').value;
    const carrera = document.getElementById('carrera').value;
    const semestre = parseInt(document.getElementById('semestre').value);
    const promedio = parseFloat(document.getElementById('promedio').value);

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
            // Subir avatar por defecto
            await upload_default_avatar();
            
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