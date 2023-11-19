const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    // Función para validar el formato de correo electrónico
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const data = new FormData(form);

    // Crear un objeto para almacenar los datos del formulario
    const obj = {};

    // Iterar sobre los datos del formulario y agregar al objeto
    data.forEach((value, key) => obj[key] = value);

    // Validar el formato del correo electrónico
    if (!isValidEmail(obj['email'])) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return; // Detener la ejecución si el correo electrónico no es válido
    }

    // Realizar la solicitud fetch solo si el correo electrónico es válido
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 201) {
            window.location.replace('/');
        }
    });
});


// const form = document.getElementById('registerForm');

// form.addEventListener('submit', e => {
    
//     e.preventDefault();

    
//     const data = new FormData(form);
//     const obj = {};
//     // {
//     //     first_name: "asdasd",
//     //     last_name: "asdasd",
//     //     age: 123
//     // }
//     data.forEach((value, key) => obj[key] = value);
//     fetch('/api/sessions/register', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(result => {
//         if (result.status === 201) {
//             window.location.replace('/');
//         }
//     })
// })