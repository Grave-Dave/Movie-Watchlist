const input = document.querySelector('.search-input');
const moviesSection = document.querySelector('.movies');
let favMovies = JSON.parse(localStorage.getItem('movies')) || [];
let checkBtn = false;

input.addEventListener('keyup', e => {
	if (e.key === 'Enter') checkMovies();
});

function addMovie(e, id) {
	e.target.disabled = true;
	document.getElementById(id).innerHTML = `
	<i class="fa-solid fa-check"></i>
	watchlist`;

	fetch(`https://www.omdbapi.com/?i=${id}&apikey=c64db92f`)
		.then(res => res.json())
		.then(data => {
			favMovies.push(data);
			localStorage.setItem('movies', JSON.stringify(favMovies));
		});
}

document.querySelector('.search-btn').addEventListener('click', checkMovies);

async function checkMovies() {
	const response = await fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=c64db92f`);
	const data = await response.json();

	if (data.Search) {
		moviesSection.innerHTML = '';
		data.Search.forEach(movie => {
			fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=c64db92f`)
				.then(res => res.json())
				.then(data => {
					moviesSection.innerHTML += getMovies(data);
				});
		});
	} else {
		moviesSection.innerHTML = `<p class="placeholder-text"><i class="fa-regular fa-face-sad-tear"></i> <br/> Unable to find what you're looking for. Please try another search.</p>`;
	}
}

function getMovies(movie) {
	checkBtn = false;
	JSON.parse(localStorage.getItem('movies')) &&
		JSON.parse(localStorage.getItem('movies')).forEach(item => {
			item.imdbID === movie.imdbID ? (checkBtn = true) : '';
		});
	return `
    <div class="movie--item">
           <img class='movie--poster' src=${movie.Poster}>
           <div class="movie--info">
               <h2 class="movie--title">${movie.Title} <span class="movie--score"><i class="fa-regular fa-star"></i> ${
		movie.imdbRating
	}</span></h2><div class="movie--details"><span class="year">${movie.Year}</span><span class="time">${
		movie.Runtime
	}</span><span class="genre">${movie.Genre}</span><button id= ${movie.imdbID} ${checkBtn && 'disabled'} onclick="addMovie(event, '${
		movie.imdbID
	}')" class="save-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button></div>
               <p class="description">${movie.Plot}.</p>
           </div>
        </div>`;
}
