//! Datos de la api
const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8' 
    }
}



const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');



const cargarPelicula = async (id = movieId) =>{
    try{

        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(`${API_SERVER}/movie/${id}?language=es-MX`, options);
        // console.log(response);

        const movie = await response.json(); // Convertimos la respuesta a JSON
        console.log(movie);

        //* Creamos la portada
        const divImg = document.getElementById('detalleImg');
        const portada = document.createElement('img');
        portada.classList.add('detalle-img');
        portada.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        portada.alt = movie.title;
        divImg.appendChild(portada);

        //* Creamos titulo, titulo original, release date, genres y duracion
        const divDetalle = document.getElementById('detalleMovie');
        
        const title = divDetalle.querySelector('h1');
        const tagline = divDetalle.querySelectorAll('p')[0];
        const info = divDetalle.querySelectorAll('p')[1];

        title.textContent = movie.title;
        tagline.textContent = movie.original_title;

        const releaseYear = movie.release_date.substring(0,4);
        const genresArray = movie.genres;
        const genres = genresArray.map(genre => genre.name).join(', ');
        
        info.textContent = `${releaseYear} • ${genres} • ${movie.runtime} minutos`;   


        //* Creamos sinopsis
        const divSinopsis = document.getElementById("sinopsis");
        const sinopsis = divSinopsis.querySelector('p');
        sinopsis.textContent = movie.overview;
    
        //* Ponemos el trailer
        const responseTrailer = await fetch(`${API_SERVER}/movie/${id}/videos?language=es-MX`,options)
        
        const data = await responseTrailer.json();

        const trailers = data.results;
        // console.log(trailers);

        const trailer = trailers.find(video => video.type === 'Trailer');
        if (trailer) {
            //* Construimos el enlace 
            const traerLink = `https://www.youtube.com/embed/${trailer.key}`;
            const iframe = document.getElementById('trailer');
            iframe.src = traerLink;

        } else {
            const divIframe = document.getElementById('divIFrame');
            divIframe.classList.remove('col-lg-6', 'col-sm-12');
            divIframe.classList.add('d-none');
            const divTable = document.getElementById('divTable');
            divTable.classList.remove('col-lg-6', 'col-sm-12');
            divTable.classList.add('col-12');
            console.log("No se encontró un trailer");
        }
        //* Completamos tabla detalle
        const status = document.getElementById("status");
        const original_language = document.getElementById("original_language");
        const budget = document.getElementById("budget");
        const revenue = document.getElementById("revenue");

        status.textContent = movie.status;

        //* Formateamos con Intl para obtener el nombre del código del idioma
        function capitalize(str) { // Para que la primer letra del idioma se ponga en mayuscula
            return str.charAt(0).toUpperCase() + str.slice(1);
          }

        let languages = new Intl.DisplayNames(['es'],{type:'language'});
        let formatted_original_language = languages.of(movie.original_language);
        original_language.textContent = capitalize(formatted_original_language);
        
        //*Formateamos para que sean del tipo $xxx.xxx,xx con la biblioteca Intl
        let formattedBudget = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget);
        budget.textContent = formattedBudget;
        
        let formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue);
        revenue.textContent = formattedRevenue;

    }catch(error){
        console.error(error);
    }
    
};

document.addEventListener("DOMContentLoaded",()=>{ cargarPelicula(movieId)});