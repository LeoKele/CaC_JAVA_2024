document.getElementById("register").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Obtengo los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;

    const fechaInput = document.getElementById("birth");
    const fechaNac = new Date(fechaInput.value); //creamos objeto del tipo Date para compara la fecha ingresada con la fecha actual
    const fechaActual = new Date();

    const pais = document.getElementById("country").value;

    const terminos = document.getElementById("terms");

    var errorNombre = document.getElementById('mensajeNombre');
    var errorApellido = document.getElementById('mensajeApellido');
    var errorEmail = document.getElementById('mensajeEmail');
    var errorContrasena = document.getElementById('mensajeContrasena');
    var errorFecha = document.getElementById('mensajeFecha');
    var errorPais = document.getElementById('mensajePais');
    var errorTerminos = document.getElementById('mensajeTerminos');

    // Limpio mensajes de error previos
    function limpiarMensajes(){
        errorNombre.textContent = '',
        errorApellido.textContent = '';
        errorEmail.textContent = '';
        errorContrasena.textContent = '';
        errorFecha.textContent = '';
        errorPais.textContent = '';
        errorTerminos.textContent = '';
    }
    limpiarMensajes();

    
    //validar nombre y apellido
    function validarTexto(texto){
        var regex = /^[A-Za-z]+$/;
        return regex.test(texto);
    }

    const nombreValido = validarTexto(nombre);
    const apellidoValido = validarTexto(apellido);

    // Valido el correo 
    const emailValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    // Valida long pw
    const contrasenaValida = contrasena.length >= 8;

    //valido date
    fechaActual.setHours(0,0,0,0); // Establezco la hora de la fecha actual a 00:00:00 para comparar solo la fecha
    const fechaValido = fechaNac < fechaActual ? true : false;


    //valido pais
    const paisValido = pais == "-" ? false : true;

    //valido checkbox
    const checkboxValido = terminos.checked ? true: false;

    //limpio campos
    document.getElementById("reset").addEventListener('click',function(){
        var mensajesError = document.querySelectorAll('.mensaje-error');
        mensajesError.forEach(function(mensaje){
            mensaje.textContent = '';
        })
    });


    // Verifica si ambos campos son válidos
    if (emailValido && contrasenaValida && nombreValido && apellidoValido && paisValido && fechaValido && checkboxValido) {
        console.log("Formulario válido");
        // alert("Bienvenido:");
    } else {
        console.log("Formulario inválido");

        // Muestro los mensajes de error debajo de los campos
        document.getElementById("mensajeNombre").textContent = nombreValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajeApellido").textContent = apellidoValido ? "" : "Por favor, complete este campo."
        document.getElementById("mensajeEmail").textContent = emailValido ? "" : "Por favor, ingrese un email valido.";
        document.getElementById("mensajeContrasena").textContent = contrasenaValida ? "" : "La contraseña debe tener al menos 8 caracteres.";
        document.getElementById("mensajeFecha").textContent = fechaValido ? "" : "Elija una fecha valida";
        document.getElementById("mensajePais").textContent = paisValido ? "" : "Por favor, elija un país.";
        document.getElementById("mensajeTerminos").textContent = checkboxValido ? "" : "Debes aceptar los términos y condiciones.";
    }
    



});
