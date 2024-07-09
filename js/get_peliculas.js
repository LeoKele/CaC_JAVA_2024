//cuando el dom se cargue 
document.addEventListener('DOMContentLoaded', async () => {
    // realizamos una peticion fetch a esta api para obtener todas las peliculas de la base:
    // configuracion de options, es un get y no necesita body
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch('http://localhost:8080/app/peliculas', options);
    const data = await response.json();
    console.log(data);
    //{idPelicula: 2, titulo: 'Transformers 2', genero: 'Accion', duracion: '3h 2m', imagen: 'transformers.jpg'}
    // Extraemos las películas de la respuesta
    const movies = data;
    // tenemos que insertar todas las peliculas en la tabla con id tablePeliculas, pero en tbody con la siguiente estructura de ejemplo:
    /*<!--este es solo un ejemplo porque se va a llenar desde js-->
                    <tr>
                        <td>The Super Mario Bros. Movie (2023)</td>
                        <td>3h 22m</td>
                        <td>Animation, Family, Adventure, Fantasy, Comedy</td>
                        <td><img width="150px" src="../assets/img/mario.jpg" alt="mario pelicula 2023"></td>
                        
                    </tr> 
    */
  
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
        btnModificar.classList.add('btn','btn_submit','my-1','mx-1');
        btnModificar.innerHTML = 'Modificar';

        const btnEliminar = document.createElement('button');
        btnEliminar.type = 'submit';
        btnEliminar.classList.add('btn','btn_submit','my-1','mx-1');
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
});