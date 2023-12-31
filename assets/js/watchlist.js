// this allows the movie and star rating that the user entered to appear in the watchlist
function addMovieToWatchlist(movie) {
    const container = document.querySelector(".watchlist-container");
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";

    const titleElement = document.createElement("li");
    titleElement.textContent = `${movie.title} - ${movie.rating} stars`;
    movieItem.appendChild(titleElement);

    container.appendChild(movieItem);
}

// this saves the movies for the watchlist into local storage
document.getElementById("addMovie").addEventListener("click", function() {
    const movieName = document.getElementById("movieInput").value;
    const rating = document.querySelectorAll(".star-rating .active").length;
    const modal = document.querySelector(".modal");

    if (movieName && rating > 0) {
        var movies = JSON.parse(localStorage.getItem("movieList")) || [];

        const movie = {
            title: movieName,
            rating: rating
        };

        movies.push(movie);
        localStorage.setItem("movieList", JSON.stringify(movies));
        document.getElementById("movieInput").value = "";

// this is the modal
        addMovieToWatchlist(movie);
        modal.style.display = "block";
    } else {
        modal.style.display = "block";
    }

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    setTimeout(function() {
        modal.style.display = "none";
    }, 1000);
});

// this controls the stars color change when the mouse scrolls over, as well as documenting which stars have been chosen by the user
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

// this makes the stars change color when the mouse scrolls away from them
document.querySelector(".star-rating").addEventListener("mouseleave", () => {
    const rating = document.querySelectorAll(".star-rating .active").length;
    if (rating === 0) {
        stars.forEach(star => star.classList.remove("active"));
    }
});

// this saves the movies for the watchlist into local storage
window.addEventListener("load", function() {
    var movies = JSON.parse(localStorage.getItem("movieList")) || [];

    for (const movie of movies) {
        addMovieToWatchlist(movie);
    }
});


