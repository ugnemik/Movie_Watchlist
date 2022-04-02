let localArr = JSON.parse(localStorage.getItem("films")) || [];
var apiKey = config.MY_API;

const watchlistContainer = document.getElementById("watchlist-content");

function renderWatchlist() {
  if (localArr.length === 0) {
    watchlistContainer.innerHTML = `
       <div class="placeholder">
            <p>Your watchlist is looking a little empty...</p>
            <a class="inline-link" href="index.html"><i class="fa-solid fa-circle-plus"></i>Let's add some movies!</a>
          </div>
        `;
  }

  localArr.forEach((item) => {
    watchlistContainer.innerHTML = "";
    fetch(`http://www.omdbapi.com/?i=${item}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((film) => {
        watchlistContainer.innerHTML += `
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
				</div><button class="add-to-watchlist" id="${film.imdbID}-watchlist" onclick="removeFromLocal('${item}')"><i class="fa-solid fa-minus"></i>Watchlist</button>
			</div>
			<div class="item description">
				${film.Plot}
			</div>
		</div>
	</div>
            `;
      });
  });
}

renderWatchlist();

function removeFromLocal(id) {
  localArr = localArr.filter((filmId) => filmId !== id);
  localStorage.setItem("films", JSON.stringify(localArr));
  renderWatchlist();
}
