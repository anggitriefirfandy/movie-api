let search = document.querySelector("#input-search");
let listMovie = document.getElementById("list-movie");
let listSearch = document.getElementById("list-search");
let judul = document.getElementById("judul");

let searchDataMovie;

let getMovie = async () => {
  let response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=fd994cd1d1b84012f15c628c5f14a14f&sort_by=popularity.desc&page=1"
  );
  let movieTampil = await response.json();
  let dataMovie = movieTampil.results;
  dataMovie.slice(0, 12).forEach((item) => {
    listMovie.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="card-img-top" alt="poster.film ${item.tittle}">
            <div class="card-body">
                <div class="title">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-text">${item.vote_average}</h5>
                </div>
                <p class="card-text">${item.release_date}</p>
            </div>
        </div>`;
  });
};
getMovie();

async function searchMovie(query) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=fd994cd1d1b84012f15c628c5f14a14f&query=${query}&page=1`
  );
  let movie = await response.json();
  listMovie.remove();
  judul.innerHTML = `<h1>hasil pencarian <span>${query}</span></h1>`;

  let dataMovie = movie.results;
  const listItem = document.getElementById("list-search");
  while (listItem.hasChildNodes()) {
    listItem.removeChild(listItem.firstChild);
  }
  // document.getElementById('listSearch');
  dataMovie.slice(0, 12).forEach((item) => {
    listSearch.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="card-img-top" alt="poster.film ${item.tittle}">
            <div class="card-body">
                <div class="title">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-text">${item.vote_average}</h5>
                </div>
                <p class="card-text">${item.release_date}</p>
            </div>
        </div>`;
  });
}
document.querySelector(".d-flex").addEventListener("submit", function (event) {
  event.preventDefault();
  searchMovie(search.value);
});
