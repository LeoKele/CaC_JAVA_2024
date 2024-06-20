document.getElementById("agregarPelicula").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Obtengo los valores de los campos
    const titulo = document.getElementById("titulo");
    const genero = document.getElementById("genero");
    const duracion = document.getElementById("duracion").value;
    // const director = document.getElementById("director");
    // const reparto = document.getElementById("reparto");
    // const sinopsis = document.getElementById("sinopsis");

    // const fechaInput = document.getElementById("fecha");
    // const fecha = new Date(fechaInput.value); //creamos objeto del tipo Date para comparar la fecha ingresada con la fecha actual
    // const fechaActual = new Date();

    var errorTitulo = document.getElementById('mensajeTitulo');
    // var errorFecha = document.getElementById('mensajeFecha');
    var errorGenero = document.getElementById('mensajeGenero');
    var errorDuracion = document.getElementById('mensajeDuracion');
    // var errorDirector = document.getElementById('mensajeDirector');
    // var errorReparto = document.getElementById('mensajeReparto');
    // var errorSinopsis = document.getElementById('mensajeSinopsis');
    var errorPortada = document.getElementById('mensajePortada');

    // Limpio mensajes de error previos
    function limpiarMensajes(){
        errorTitulo.textContent = '';
        // errorFecha.textContent = '';
        errorGenero.textContent = '';
        errorDuracion.textContent = '';
        // errorDirector.textContent = '';
        // errorReparto.textContent = '';
        // errorSinopsis.textContent = '';
        errorPortada.textContent = '';
    }
    limpiarMensajes();

    //validar titulo y sinopsis
    // function validarAlfanumerico(texto){
    //     var regex = /^[A-Za-z 0-9]+$/;
    //     return regex.test(texto);
    // }
    
    //validar Genero, Director, Reparto
    // function validarTexto(texto){
    //     var regex = /^[A-Za-z ]+$/;
    //     return regex.test(texto);
    // }

    function validarInput(input) {
        if (input){
            return input.value.trim() !== '';
        }
        return false;
      }
      
    const tituloValido = validarInput(titulo);
    // const sinopsisValido = validarInput(sinopsis);

    const generoValido = validarInput(genero);
    // const directorValido = validarInput(director);
    // const repartoValido = validarInput(reparto);


    //validar duracion
    function transformarTiempo(input) {
        const tiempo = input.trim(); // Elimina espacios en blanco al principio y al final
        const regex = /^(\d+)h?\s*(\d*)m?$/; // Expresión regular para analizar el formato
    
        const match = tiempo.match(regex);
        if (!match) {
            return false;
        }
    
        const horas = parseInt(match[1]);
        const minutos = parseInt(match[2] || 0);
    
        if (horas < 0 || minutos < 0 || minutos >= 60) {
            return false;
        }
    
        return `${horas}h ${minutos}m`;
    }
    
    
    duracionValido = transformarTiempo(duracion);

    // //valido date
    // fechaActual.setHours(0,0,0,0); // Establezco la hora de la fecha actual a 00:00:00 para comparar solo la fecha
    // const fechaValido = fecha < fechaActual ? true : false;


    //* Valido que el input portada sea .jpg o .jpeg y que no esté vacio
    function archivoImgValido(){
        var portada = document.getElementById('portada');
        var archivo = portada.files[0];
        if (archivo && /\.(jpe?g)$/i.test(archivo.name)) {
            return true;
        }
        else return false;
    }

    const portadaValido = archivoImgValido();
    // console.log(portadaValido);
    



    //limpio campos
    document.getElementById("reset").addEventListener('click',function(){
        var mensajesError = document.querySelectorAll('.mensaje-error');
        mensajesError.forEach(function(mensaje){
            mensaje.textContent = '';
        })
    });


    // Verifica si ambos campos son válidos
    if (tituloValido && generoValido && duracionValido && portadaValido) {
        console.log("Formulario válido");

    } else {
        console.log("Formulario inválido");

        // Muestro los mensajes de error debajo de los campos
        document.getElementById("mensajeTitulo").textContent = tituloValido ? "" : "Por favor, completa este campo.";
        // document.getElementById("mensajeFecha").textContent = fechaValido ? "" : "Elija una fecha valida"
        document.getElementById("mensajeGenero").textContent = generoValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajeDuracion").textContent = duracionValido ? "" : "Formato de tiempo no válido. Debe ser '90m' o '1h 30m'.";
        // document.getElementById("mensajeDirector").textContent = directorValido ? "" : "Por favor, completa este campo.";
        // document.getElementById("mensajeReparto").textContent = repartoValido ? "" : "Por favor, completa este campo.";
        // document.getElementById("mensajeSinopsis").textContent = sinopsisValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajePortada").textContent = portadaValido ? "" : "Por favor, ingrese una imagen";
    }
    



});
