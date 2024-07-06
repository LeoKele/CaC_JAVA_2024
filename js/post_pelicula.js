// cuando el dom se cargue
document.addEventListener('DOMContentLoaded', async () => {
    // tengo que levantar los datos del formulario, validar los inputs, en caso de algun value vacio, mostrar un mensaje de error
    // y no hacer la peticion fetch
    // si los datos son correctos, realizo la peticion fetch post a la api para agregar una pelicula
    // si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
    
    //obtengo el formulario
    formNuevaPelicula = document.getElementById('agregarPelicula');
    //agrego el evento submit al formulario
    formNuevaPelicula.addEventListener('submit', async (event) => {
        //prevengo el comportamiento por defecto del formulario
        event.preventDefault();
        //obtengo los datos del formulario
        const formData = new FormData(formNuevaPelicula);
        //obtengo los valores de los inputs
        const titulo = formData.get('titulo');
        const genero = formData.get('genero');
        const duracion = formData.get('duracion');
        const imagen = formData.get('imagen');
        //valido los inputs
        if (titulo === '' || genero === '' || duracion === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }
        // levanto solo el nombre del file para enviarlo a la api
        const imageName = imagen.name;
      
        //configuracion de options, es un post y necesita body
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                genero: genero,
                duracion: duracion,
                imagen: imageName
            })
        };
        //realizo la peticion fetch a la api para agregar una pelicula
        const response = await fetch('http://localhost:8080/apisimple/peliculas', options);
        //obtengo la respuesta
        const data = await response.json();
        //si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
        // si el codigo es 201, la pelicula se agrego correctamente
        if (response.status === 201) {
            alert('Pelicula agregada correctamente');
            formNuevaPelicula.reset();
            // que se recargue la pagina para ver la pelicula agregada
            location.reload();
        } else {
            alert('Error al agregar la pelicula');
        }
       
    });

});