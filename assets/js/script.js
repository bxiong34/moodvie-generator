document.addEventListener('DOMContentLoaded', function() {
    var moodDropdown = document.getElementById('question1');
    var submitBtn = document.getElementById('submitBtn');
    var moviesList = document.getElementById('moviesList');
    
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

    function displayMovies(movies) {
        moviesList.innerHTML = ''; // Clear previous movie list

        movies.forEach(function(movie) {
            var listItem = document.createElement('li');
            listItem.textContent = movie.title;
            moviesList.appendChild(listItem);
        });
    }
});


