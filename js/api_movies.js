//! Datos de la api
const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8' 
    }
}

//! Funcion Crear Tarjeta Pelicula
function crearTarjetaPelicula(pelicula){
    const card = document.createElement('div');
    card.classList.add('col-sm-12','col-md-6','col-lg-3','mb-sm-0','my-2');

    const cardInner = document.createElement('a')
    cardInner.classList.add('card')
    cardInner.href = `pages/detalle.html?id=${pelicula.id}`;

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



//* Number page para peliculas en main
let numberPage = 1;
document.getElementById("siguiente").addEventListener("click",()=>{
    if(numberPage < 4){ //Asi solamente hacemos que carguen hasta 4 paginas
        numberPage = numberPage + 1;
        cargarPeliculas(numberPage);
    }

});
document.getElementById("anterior").addEventListener("click",()=>{
    if (numberPage > 1) { // Asi validamos que al tocar el boton anterior la numberPage no sea 0 o menor.
        numberPage = numberPage - 1;
        cargarPeliculas(numberPage);
    } 
});

//! Cargar peliculas Main
const cargarPeliculas = async (page = numberPage) =>{
    try{

        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(`${API_SERVER}/movie/popular?page=${page}?language=es-MX`, options);
        // console.log(response);

        const data = await response.json(); // Convertimos la respuesta a JSON
        console.log(data);

        const movies = data.results;// Extraemos las películas de la respuesta, array de objetos de peliculas
        // const movies = data.results.slice(0,18); //limito a 18 las peliculas
        // console.log(movies);

        const peliculasSection = document.getElementById('peliculasSection');
        peliculasSection.innerHTML = '';// Limpiamos el contenido previo del contenedor


        movies.forEach(movie => {
            const peliculaCard = crearTarjetaPelicula(movie);// Iteramos sobre las películas
            peliculasSection.appendChild(peliculaCard);// Añadimos la tarjeta de película al contenedor
        });// Iteramos sobre las películas
    
    }catch(error){
        console.error(error);
    }
    
};

document.addEventListener("DOMContentLoaded",()=>{ cargarPeliculas(1)});



//! Pelicula buscada
document.getElementById("form_buscar").addEventListener("submit", async (event) => {
    event.preventDefault();
    const busqueda = document.getElementById("buscar").value.trim();
    if (busqueda) {
        await buscarPeliculas(busqueda);
    } else {
        console.log('Por favor ingresa un término de búsqueda');
        document.getElementById('busquedaSection').innerHTML = '';
    }
});

const buscarPeliculas = async (movie) => {
    try {
        const response = await fetch(`${API_SERVER}/search/movie?query=${movie}`, options);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        console.log(data);

        const busquedaSection = document.getElementById('busquedaSection');
        busquedaSection.innerHTML = '';
        
        const peliculaBuscada = data.results;
        //* Mostrar un solo resultado
        if (peliculaBuscada.length > 0){
            const peliculaCard = crearTarjetaPelicula(peliculaBuscada[0]);
            busquedaSection.appendChild(peliculaCard);
        } else{
            busquedaSection.innerHTML = '<p>No se encontraron resultados.</p>';
        }


    } catch (error) {
        console.log(error);
    }
};


//! Peliculas aclamadas

const masAclamadas = async () => {
    try {
        const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();

        const aclamadas = data.results.slice(0,9);
        console.log(aclamadas);
        const aclamadasSection = document.getElementById('aclamadas_list');
        aclamadasSection.innerHTML = '';

        


        aclamadas.forEach(aclamadas => {

            const li = document.createElement('li');
            li.classList.add('glide__slide');
            aclamadasSection.appendChild(li);

            const peliculaCard = crearTarjetaPelicula(aclamadas);
            peliculaCard.classList.remove('col-sm-12','col-md-6','col-lg-3','mb-sm-0','my-2');
            li.appendChild(peliculaCard);

        })

        const divArrows = document.createElement('div');
        divArrows.classList.add('glide__arrows');
        divArrows.setAttribute('data-glide-el','controls');

        const carousel = document.getElementById('carousel');
        carousel.appendChild(divArrows);

        const btnLeft = document.createElement('button');
        btnLeft.classList.add('glide__arrow','glide__arrow--left','btn_submit');
        btnLeft.setAttribute('data-glide-dir','<');
        btnLeft.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

        const btnRight = document.createElement('button');
        btnRight.classList.add('glide__arrow','glide__arrow--right','btn_submit');
        btnRight.setAttribute('data-glide-dir','>');
        btnRight.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        
        divArrows.append(btnLeft,btnRight);


        const config = {
            type: 'carousel',
            perView: 4,
            width: 25,
            focusAt: 'center',
            gap: 30,
            breakpoints: {
              800: {
                perView: 2
              },
              480: {
                perView: 1
              }
            },
      
          };
          new Glide(".glider-contain",config).mount();

    } catch (error) {
        console.log(error);
    }
};

document.addEventListener("DOMContentLoaded",()=>{ masAclamadas()});


