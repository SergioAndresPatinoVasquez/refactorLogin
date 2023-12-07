// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const obj = {};

        data.forEach((value, key) => (obj[key] = value));

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
               window.location.replace('/products')
              } else {
                location.href = '/login'
              }

            // if (response.ok) {
            //     // Inicio de sesión exitoso, obtener el token del cuerpo de la respuesta
            //     const { token } = await response.json();

            //     // Almacenar el token en una cookie
            //     document.cookie = `coderCookieToken=${token}; path=/`;

            //     // Redirige a la página de productos
            //     window.location.replace('/products');
            // } else {
            //     const error = await response.json();
            //     alert(error.error);
            // }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});



// const form = document.getElementById('loginForm');

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const data = new FormData(form);
//     const obj = {};

//     data.forEach((value, key) => obj[key] = value);

//     fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(async (result) => {
//         if (result.ok) {
//             // Inicio de sesión exitoso, redirige a la página de productos
//             window.location.replace('/products');
//         } else {
//             const error = await result.json();
//             alert(error.error);
//         }
//     }).catch(error => {
//         console.error('Error during login:', error);
//     });
// });
