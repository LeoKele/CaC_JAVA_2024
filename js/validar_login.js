document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault(); 


    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;
    var errorEmail = document.getElementById('mensajeEmail');
    var errorContrasena = document.getElementById('mensajeContrasena');

    errorEmail.textContent = '';
    errorContrasena.textContent = '';


    const emailValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);


    const contrasenaValida = contrasena.length >= 8;


    if (emailValido && contrasenaValida) {
        console.log("Formulario válido");
        // alert("Bienvenido:");
    } else {

        console.log("Formulario inválido");
        document.getElementById("mensajeEmail").textContent = emailValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajeContrasena").textContent = contrasenaValida ? "" : "Por favor, completa este campo.";
    }
    



});
