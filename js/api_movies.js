function crearTarjetaPelicula(pelicula){
    const card = document.createElement('div');
    card.classList.add('col-sm-12','col-md-6','col-lg-3','mb-sm-0','my-2');

    const cardInner = document.createElement('a')
    cardInner.classList.add('card')
    cardInner.href = 'pages/detalle.html';

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img');

    cardImg.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
    cardImg.alt = pelicula.title;
    cardImg.loading = 'lazy';

    //cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-img-overlay');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('position-absolute','top-50','start-50','translate-middle');
    cardTitle.textContent = pelicula.title;

    // Añadir elementos a la tarjeta de película
    cardBody.appendChild(cardTitle);
    cardInner.appendChild(cardImg);
    cardInner.appendChild(cardBody);
    // agrego la tarejta a la columna de bootstrap
    card.appendChild(cardInner);

    return card;
};

//Datos de la api
const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8' 
    }
}


let numberPage = 1;
document.getElementById("siguiente").addEventListener("click",()=>{
    if(numberPage < 4){ //Asi solamente hacemos que carguen hasta 4 paginas
        numberPage = numberPage + 1;
        // console.log(numberPage);
        cargarPeliculas(numberPage);
    }

});
document.getElementById("anterior").addEventListener("click",()=>{
    if (numberPage > 1) { // Asi validamos que al tocar el boton anterior la numberPage no sea 0 o menor.
        numberPage = numberPage - 1;
        // console.log(numberPage);
        cargarPeliculas(numberPage);
    } 
});

// Cargar peliculas
const cargarPeliculas = async (page = numberPage) =>{
    try{

        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
        // console.log(response);

        const data = await response.json(); // Convertimos la respuesta a JSON
        console.log(data);

        const movies = data.results;// Extraemos las películas de la respuesta, array de objetos de peliculas
        // const movies = data.results.slice(0,18); //limito a 18 las peliculas
        // console.log(movies);

        const peliculasSection = document.getElementById('peliculasSection');
        peliculasSection.innerHTML = '';// Limpiamos el contenido previo del contenedor

        // const cargando = document.createElement('div');
        // cargando.id = 'spinner';
        // cargando.innerHTML = 'Cargando...'
        // peliculasSection.appendChild(cargando);
        // document.getElementById('spinner').style.display = 'none';

        movies.forEach(movie => {
            const peliculaCard = crearTarjetaPelicula(movie);// Iteramos sobre las películas
            peliculasSection.appendChild(peliculaCard);// Añadimos la tarjeta de película al contenedor
        });// Iteramos sobre las películas
    
    }catch(error){
        console.error(error);
    }
    
};

document.addEventListener("DOMContentLoaded",()=>{ cargarPeliculas(1)});



// document.getElementById("input_buscar").addEventListener("click",()=>{

// });