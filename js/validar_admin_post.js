document.getElementById("agregarPelicula").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    // Obtengo los valores de los campos
    const titulo = document.getElementById("titulo");
    const genero = document.getElementById("genero");
    const duracion = document.getElementById("duracion").value;
    const portada = document.getElementById('portada');


    var errorTitulo = document.getElementById('mensajeTitulo');
    var errorGenero = document.getElementById('mensajeGenero');
    var errorDuracion = document.getElementById('mensajeDuracion');
    var errorPortada = document.getElementById('mensajePortada');

    

    function limpiarMensajes(){
        errorTitulo.textContent = '';
        errorGenero.textContent = '';
        errorDuracion.textContent = '';
        errorPortada.textContent = '';
    }
    limpiarMensajes();


    function validarInput(input) {
        if (input){
            return input.value.trim() !== '';
        }
        return false;
      }
      
    const tituloValido = validarInput(titulo);

    const generoValido = validarInput(genero);



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

    //* Valido que el input portada sea .jpg o .jpeg y que no esté vacio
    function archivoImgValido(portada){
        var archivo = portada.files[0];
        if (archivo && /\.(jpe?g)$/i.test(archivo.name)) {
            return true;
        }
        else return false;
    }

    const portadaValido = archivoImgValido(portada);

    



    //limpio campos
    document.getElementById("reset").addEventListener('click',function(){
        var mensajesError = document.querySelectorAll('.mensaje-error');
        mensajesError.forEach(function(mensaje){
            mensaje.textContent = '';
        })
    });



    if (tituloValido && generoValido && duracionValido && portadaValido) {
        // console.log("Formulario válido"); 
        // console.log(titulo.value,genero.value,duracion,portada.value);
        //! Empieza el metodo POST una vez que se valida el form
        //Obtenemos el nombre de la img subida
        const partes = portada.value.split('\\'); //divide la ruta por las barras invertidas
        const portadaNombre = partes[partes.length-1]; //el ult elemento es nuestro archivo
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo.value,
                genero: genero.value,
                duracion: duracion,
                imagen: portadaNombre

            })
        };
        //realizo la peticion fetch a la api para agregar una pelicula
        const response = await fetch('http://localhost:8080/app/peliculas', options);
        //obtengo la respuesta
        const data = await response.json();
        //si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
        // si el codigo es 201, la pelicula se agrego correctamente
        if (response.status === 201) {
            swal({
                title: "Pelicula agregada correctamente",
                icon: "success",
              }).then((value)=>{
                if (value){
                    // que se recargue la pagina para ver la pelicula agregada
                    location.reload();
                }
              });


        } else {
            swal({
                title: "Error al agregar la pelicula.",
                text: "Por Favor, intente de nuevo más tarde",
                icon: "error",
              });
        }


    } else {
        document.getElementById("mensajeTitulo").textContent = tituloValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajeGenero").textContent = generoValido ? "" : "Por favor, completa este campo.";
        document.getElementById("mensajeDuracion").textContent = duracionValido ? "" : "Formato de tiempo no válido. Debe ser '90m' o '1h 30m'.";
        document.getElementById("mensajePortada").textContent = portadaValido ? "" : "Por favor, ingrese una imagen";
    }
    



});
