const search = document.getElementById("search");
const moviesContainer = document.getElementById("movie-list-content");
const localArr = JSON.parse(localStorage.getItem("films")) || [];

var apiKey = config.MY_API;

search.addEventListener("submit", function (e) {
  e.preventDefault();
  moviesContainer.innerHTML = `<p class="placeholder">Loading...</p>`;
  let userInput = document.getElementById("user-input").value.replace(" ", "+");

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${userInput}`)
    .then((res) => res.json())
    .then((data) => {
      moviesContainer.innerHTML = "";
      data.Search.forEach((film) => {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${film.imdbID}`)
          .then((res) => res.json())
          .then((film) => {
            moviesContainer.innerHTML += `
	<div class="movie">
		<div class="movie-img"><img src="${film.Poster}"></div>
		<div class="movie-description">
			<div class="item title">
				<h2>${film.Title}<span class="rating"><i class="fa-solid fa-star"></i>${film.imdbRating}</span></h2>
			</div>
			<div class="item details">
				<div class="length">
					${film.Runtime}
				</div>
				<div class="genre">
					${film.Genre}
				</div><button class="add-to-watchlist" id="${film.imdbID}-watchlist" onclick="addToLocal('${film.imdbID}')"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
			</div>
			<div class="item description">
				${film.Plot}
			</div>
		</div>
	</div>
              `;
            if (localArr.includes(film.imdbID)) {
              const currentIdWatchlist = document.getElementById(
                `${film.imdbID}-watchlist`
              );

              currentIdWatchlist.innerHTML = `<i class="fa-solid fa-circle-check"></i>Added`;
            }
          });
      });
    })
    .catch((err) => {
      moviesContainer.innerHTML = `<p class="placeholder">Unable to find what youre looking for. Please try another search.</p>`;
    });
});

function addToLocal(id) {
  if (!localArr.includes(id)) {
    localArr.push(id);
    localStorage.setItem("films", JSON.stringify(localArr));

    const currentIdWatchlist = document.getElementById(`${id}-watchlist`);

    currentIdWatchlist.innerHTML = `<i class="fa-solid fa-circle-check"></i>Added`;
  }
}
