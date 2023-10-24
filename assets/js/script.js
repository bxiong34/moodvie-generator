document.addEventListener('DOMContentLoaded', function() {
    var moodDropdown = document.getElementById('question1');
    var submitBtn = document.getElementById('submitBtn');
    var moviesList = document.getElementById('moviesList');
    var popularMoviesList = document.getElementById('popularMoviesList');
    var showAllBtn = document.getElementById('showAllBtn');
    var showFiveBtn = document.getElementById('showFiveBtn'); // New button for displaying 5 movies

    var popularMovies = []; // Declare the popularMovies array here

    // Genre IDs corresponding to mood options
    var genreMappings = {
        'Action': 28,
        'Adventure': 12,
        'Comedy': 35,
        'Drama': 18,
        'Fantasy': 14,
        'Horror': 27,
        'Romance': 10749,
        'Science Fiction': 878,
        'Sports': 10770,
        'Thriller': 53,
        'Western': 37
    };

    // API Key and Access Token
    const apiKey = '9c8587c5d74be48e6c13173a8c0f9b9d';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzg1ODdjNWQ3NGJlNDhlNmMxMzE3M2E4YzBmOWI5ZCIsInN1YiI6IjY1MmRlNzQ0Y2FlZjJkMDBhZGE3YTY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t9cyyRqdnYoRIfmIGbhdkfIfMIVF3XTBdlxkOQQyTfo';

    submitBtn.addEventListener('click', function() {
        var selectedMood = moodDropdown.value;
        fetchMovies(selectedMood);
    });

    function fetchMovies(mood) {
        var genreId = genreMappings[mood]; // Get the genre ID for the selected mood
        const moviesEndpoint = 'https://api.themoviedb.org/3/discover/movie';

        const movies = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        };

        // Fetch movies of the selected genre
        fetch(`${moviesEndpoint}?api_key=${apiKey}&with_genres=${genreId}`, movies)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error:', error));
    }

    function fetchPopularMovies() {
        const popularMoviesEndpoint = 'https://api.themoviedb.org/3/movie/popular';

        const popularMoviesRequest = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        };

        // Fetch popular movies
        fetch(`${popularMoviesEndpoint}?api_key=${apiKey}`, popularMoviesRequest)
            .then(response => response.json())
            .then(data => {
                popularMovies = data.results; // Populate the popularMovies array
                displayPopularMovies(popularMovies, 5); // Display 5 movies initially
            })
            .catch(error => console.error('Error:', error));
    }

    function displayMovies(movies) {
        moviesList.innerHTML = ''; // Clear previous movie list
    
        // Get the selected mood from the dropdown
        var selectedMood = moodDropdown.value;
    
        // Display movie images only if a specific mood is selected (not the default option)
        if (selectedMood !== "") {
            movies.forEach(function(movie) {
                var listItem = document.createElement('li');
                var movieImage = document.createElement('img');
                movieImage.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                movieImage.alt = movie.title;
                listItem.appendChild(movieImage);
                moviesList.appendChild(listItem);
            });
    
            // Show the movies list title
            document.getElementById('moviesListTitle').style.display = 'block';
        } else {
            // Hide the movies list title if no mood is selected
            document.getElementById('moviesListTitle').style.display = 'none';
        }
    }
    
    
    

    function displayPopularMovies(movies, numToShow) {
        popularMoviesList.innerHTML = ''; // Clear previous popular movie list

        // Display the specified number of movies
        for (var i = 0; i < numToShow; i++) {
            if (movies[i]) {
                var movieImage = document.createElement('img');
                movieImage.src = `https://image.tmdb.org/t/p/w200${movies[i].poster_path}`;
                movieImage.alt = movies[i].title;
                popularMoviesList.appendChild(movieImage);
            }
        }

        // If there are more movies than the specified number, show the "Show All" button
        if (movies.length > numToShow) {
            showAllBtn.classList.remove('hidden');
        }
    }

    // Call the fetchPopularMovies function when the page loads to display popular movies
    fetchPopularMovies();

    // Show all popular movies when the "Show All" button is clicked
    showAllBtn.addEventListener('click', function() {
        displayPopularMovies(popularMovies, popularMovies.length);
        showAllBtn.classList.add('hidden');
        showFiveBtn.classList.remove('hidden'); // Show the "Show Five" button
    });

    // Show 5 popular movies when the "Show Five" button is clicked
    showFiveBtn.addEventListener('click', function() {
        displayPopularMovies(popularMovies, 5);
        showAllBtn.classList.remove('hidden'); // Show the "Show All" button
        showFiveBtn.classList.add('hidden');
    });

    submitBtn.addEventListener('click', function() {
        var selectedMood = moodDropdown.value;
        
        // Check if the default option is selected
        if (selectedMood === "") {
            alert('Please select your mood.'); // Display an alert message
        } else {
            fetchMovies(selectedMood); // Fetch movies for the selected mood
        }
    });
    
    //Opens up navbar
    const burgerIcon = document.querySelector("#burger");
    const navbarMenu = document.querySelector("#nav-links");

    burgerIcon.addEventListener("click", function() {
    navbarMenu.classList.toggle("is-active");
    });


    const navPopular = document.querySelector("#nav-popular");
    const navHome = document.querySelector("#nav-home")
    const columnPopular = document.querySelector(".column-popularmovies");
    const columnQuestion = document.querySelector(".column-question")

    // Shows popular movies column when "Popular Movies" nav-item is clicked on and hides question column
    navPopular.addEventListener("click", function() {
        columnQuestion.classList.add("hidden")
        columnPopular.classList.remove("is-hidden");
    })

    // Shows question column when "Home" nav-item is clicked on and hides popular movies column
    navHome.addEventListener("click", function() {
        columnQuestion.classList.remove("hidden")
        columnPopular.classList.add("is-hidden");
    })

});
