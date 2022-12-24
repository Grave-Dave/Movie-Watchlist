let movies = JSON.parse(localStorage.getItem('movies'));
const savedMoviesSection = document.querySelector('.saved-movies');

function removeItemAll(arr, value) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

function removeMovie(id) {
  const newMovies = movies.map(movie => {
    return movie.imdbID === id ? 'delete' : movie
	});
  removeItemAll(newMovies, 'delete')
  movies = newMovies
	if (newMovies.length > 0) localStorage.setItem('movies', JSON.stringify(movies));
	else localStorage.removeItem('movies');
  render();
  
}

// console.log(movies);
function refreshSaved() {
	if (movies && movies.length>0) {
		return movies.map(movie => {
			return `<div class="movie--item">
               <img class='movie--poster' src=${movie.Poster}>
               <div class="movie--info">
                   <h2 class="movie--title">${movie.Title} <span class="movie--score"><i class="fa-regular fa-star"></i> ${movie.imdbRating}</span></h2><div class="movie--details"><span class="year">${movie.Year}</span><span class="time">${movie.Runtime}</span><span class="genre">${movie.Genre}</span><button onclick="removeMovie('${movie.imdbID}')" class="save-btn"><i class="fa-solid fa-circle-minus"></i></i> Remove</button></div>
                   <p class="description">${movie.Plot}.</p>
               </div>
            </div>`;
		});
	} else return `<p class="placeholder-text"><i class="fa-solid fa-wind"></i><br />There is nothing here </p>`;
}
const render = ()=>{
  savedMoviesSection.innerHTML = refreshSaved();
}
render()