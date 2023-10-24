function addMovieToWatchlist(movie) {
    const container = document.querySelector(".watchlist-container");
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";

    const titleElement = document.createElement("li");
    titleElement.textContent = `${movie.title} - ${movie.rating} stars`;
    movieItem.appendChild(titleElement);

    container.appendChild(movieItem);
}

document.getElementById("addMovie").addEventListener("click", function() {
    const movieName = document.getElementById("movieInput").value;
    const rating = document.querySelectorAll(".star-rating .active").length;
    const modal = document.querySelector(".modal");

    modal.classList.add("is-active");

    if (movieName && rating > 0) {
        var movies = JSON.parse(localStorage.getItem("movieList")) || [];

        const movie = {
            title: movieName,
            rating: rating
        };

        movies.push(movie);
        localStorage.setItem("movieList", JSON.stringify(movies));
        document.getElementById("movieInput").value = "";

        addMovieToWatchlist(movie);
    } else {
        showModal("Enter a movie title and select a rating");
    }
});

//click on background to exit out of the modal
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-background");

modalBg.addEventListener("click", function() {
    modal.classList.remove("is-active")
})

const stars = document.querySelectorAll(".star-rating i");

stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add("active");
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove("active");
        }
    });

    star.addEventListener("click", () => {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add("active");
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove("active");
        }
    });
});

document.querySelector(".star-rating").addEventListener("mouseleave", () => {
    const rating = document.querySelectorAll(".star-rating .active").length;
    if (rating === 0) {
        stars.forEach(star => star.classList.remove("active"));
    }
});

window.addEventListener("load", function() {
    var movies = JSON.parse(localStorage.getItem("movieList")) || [];

    for (const movie of movies) {
        addMovieToWatchlist(movie);
    }
});


