//* REGION END_PELICULAS

document.addEventListener('DOMContentLoaded', async () => {
    // realizamos una peticion fetch a esta api para obtener todas las peliculas de la base:
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch('http://localhost:8080/app/peliculas', options);
    const data = await response.json();
    // console.log(data);
    // Extraemos las películas de la respuesta
    const movies = data;
  
    //obtenemos el tbody de la tabla
    const tbody = document.getElementById('bodyTablePeliculas');
    tbody.innerHTML = '';
    // recorremos todas las peliculas
    movies.forEach(movie => {
        // creamos un tr
        const tr = document.createElement('tr');
        tr.classList.add('text-center');

        const tdId = document.createElement('td');
        tdId.classList.add('p-2');
        tdId.textContent = movie.idPelicula;

        // creamos un td con el titulo de la pelicula
        const tdTitle = document.createElement('td');
        tdTitle.textContent = movie.titulo;
        tdTitle.classList.add('p-2');

        // creamos un td con la duracion de la pelicula
        const tdDuration = document.createElement('td');
        tdDuration.textContent = movie.duracion;
        tdDuration.classList.add('p-2');

        // creamos un td con los generos de la pelicula
        const tdGenres = document.createElement('td');
        tdGenres.textContent = movie.genero;
        tdGenres.classList.add('p-2');
        // creamos un td con la imagen de la pelicula
        const tdImage = document.createElement('td');
        tdImage.classList.add('p-2');

        const img = document.createElement('img');
        img.src = "../assets/img/adminPosters/" + movie.imagen;
        img.width = '150';
        img.alt = movie.titulo;
        tdImage.appendChild(img);
        //agrego la clase a la imagen para que se vea mejor de bootstrap fluid y thumbnail
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');

        //Añadimos los botones de accion
        const tdAccion = document.createElement('td');
        tdAccion.classList.add('p-2');
        const btnModificar = document.createElement('button');
        btnModificar.type = 'submit';
        btnModificar.classList.add('btn','btn_submit','my-1','mx-1','btnModificar');
        btnModificar.innerHTML = 'Modificar';

        const btnEliminar = document.createElement('button');
        btnEliminar.type = 'submit';
        btnEliminar.classList.add('btn','btn_submit','my-1','mx-1','btnEliminar');
        btnEliminar.innerHTML = 'Eliminar';

        tdAccion.appendChild(btnModificar);
        tdAccion.appendChild(btnEliminar);

        // añadimos los td al tr
        tr.appendChild(tdId);
        tr.appendChild(tdImage);
        tr.appendChild(tdTitle);
        tr.appendChild(tdGenres);
        tr.appendChild(tdDuration);
        tr.appendChild(tdAccion);

        // añadimos el tr a al body
        tbody.appendChild(tr);

    });
    // END REGION GET_PELICULAS TERMINA LOGICA DEL GET ., TERMINA LOGICA DE LLENAR LA TABLA DE PELICULAS

    //* Evento para modificar
    // document.querySelectorAll('.btnModificar').forEach(button =>{
    //     button.addEventListener('click', async(event)=>{
    //         const row = event.target.closest('tr');
            
    //         // console.log(row);
    //         const peliculaId = row.querySelector('td:first-child').innerText.trim();
    //         // console.log(peliculaId);
            
    //         try{
    //             const response = await fetch(`http://localhost:8080/app/peliculas?id=${peliculaId}`);
    //             if (!response.ok){
    //                 // lanzo una excepcion en caso de que no funcione el fetch, esto se ve en la consola
    //                 throw new Error('Error al obtener los datos de la película');
    //             }
    //             const data = await response.json();
    //             const movieUnica = data[0];
    //             console.log(movieUnica);
    //             // son los id del formulario, como son unicos e irrepetibles dentro del html, sabe a quien insertarles los valores
    //             // document.getElementById('id').value = movieUnica.idPelicula;
    //             document.getElementById('titulo').value = movieUnica.titulo;
    //             document.getElementById('genero').value = movieUnica.genero;
    //             document.getElementById('duracion').value = movieUnica.duracion;

                
    //         }
    //         catch(error){
    //             console.log('Error: ', error);
    //         }
    //     });

    // });
    //* Evento para eliminar
    // document.querySelectorAll('.btnEliminar').forEach(button =>{
    //     button.addEventListener('click',async (event)=>{
    //         const row = event.target.closest('tr');
    //         const peliculaId = row.querySelector('td:first-child').innerText.trim();
    //         try {
    //             const response = await fetch(`http://localhost:8080/app/peliculas?id=${peliculaId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 alert('Error al eliminar la película');
    //                 throw new Error('Error al eliminar la película');
    //             }
    //             const data = await response.json();
    //             // si da ok muestro alerta que se elimino correctamente
               
    //             alert('Pelicula eliminada correctamente');
    //             console.log(data);
    //             location.reload();// recargo la pagina 
               
              
               
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     });
    // });
});