// This variable contains the initial bundle of movies shown on the page
const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=734204555dc0224f3924f520b13e51a9&page=1';

// This variable grabs the image of the specified title
const imgPath = 'https://image.tmdb.org/t/p/w1280';

// This variable allows you to search for specific movies
const searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=734204555dc0224f3924f520b13e51a9&query="';

// This variable grabs the specific url of the movie returned so you can visit the site for more info
const movieURL = 'https://www.themoviedb.org/movie/'

// Variables for DOM elements
const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Call the function to get the initial bundle of movies
getMovies(apiURL);

// This asynchronous function takes a url as its parameter(getMovies), pulls information from that url (res), and converts that information to JSON (data), which is then passed as an argument (data.results) to the function showMovies.
// You can think of JSON like a key-value pair. It organizes all the information into an easily readable set of data in the way that objects do.
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results)
    console.log(data);
}
// Visit this link to see what the api looks like: https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=734204555dc0224f3924f520b13e51a9
// I have added a console log to the data pulled from the above function so you can see what it looks like in comparison

// This function simply takes an array of the movie objects and returns the requested information (title, poster_path, vote_average, etc. You can add more.)
// After that information is pulled, an html element (movieEl) is created for each movie displayed, this creates the grid of movie titles you can see, and each is appended to the main element.
function showMovies(movies){
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, id, } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div>
        <a href="https://www.themoviedb.org/movie/${id}">
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        </a>
    `
    main.appendChild(movieEl);
    })
}
// This simply changes the text-color of the rating
function getClassByRating(vote) {
    if (vote >= 7.5){
        return 'green'
    } else if (vote >=5){
        return 'orange'
    } else {
        return 'red'
    }
}

// This is what allows you to search for a movie. It prevents the default ability of a button (submitting) and instead calls the getMovies function using the users input, if there is any. If no value is entered, the page will refresh
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== ''){
        getMovies(searchAPI + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})