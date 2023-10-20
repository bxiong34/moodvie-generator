function addMovieToWatchlist(movie) {
    const container = document.querySelector(".watchlist-container");
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";

    const titleElement = document.createElement("li");
    titleElement.textContent = `${movie.title} ${movie.rating}`;
    movieItem.appendChild(titleElement); 

    container.appendChild(movieItem);
}

document.getElementById("addMovie").addEventListener("click", function() {
    console.log("button clicked");
    const movieName = document.getElementById("movieInput").value;
    const rating = document.querySelectorAll(".star-rating .active").length;

    if (movieName) {
        var movies = JSON.parse(localStorage.getItem("movieList")) || [];

        const movie = {
            title: movieName,
            rating: rating
        };

        movies.push(movie);
        localStorage.setItem("movieList", JSON.stringify(movies));
        document.getElementById("movieInput").value = "";

        alert("Moodvie has been added to your watchlist!");

        addMovieToWatchlist(movie);
    } else {
        alert("Enter a movie title");
    }
});

window.addEventListener("load", function() {
    var movies = JSON.parse(localStorage.getItem("movieList")) || [];

    for (const movie of movies) {
        addMovieToWatchlist(movie);
    }
});

var stars = document.querySelectorAll(".star-rating i")
stars.forEach((item, index1) => {
    item.addEventListener("click", () => {
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});
