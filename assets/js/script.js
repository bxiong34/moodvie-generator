// APIs -->
// trending movies list
const movies = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWQ3YjM3OWJiZGQ0MDE4MjJkYzgyOWFlNmRlMzYxMyIsInN1YiI6IjY1MmRkZjE2Y2FlZjJkMDBmZjUzMzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ic-8Kvdhlt38LmfCxkQgl8OgbKa_GNsLcjNvz9BlSHM'
    }
};
  
fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', movies)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// movie genres list
const genres = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWQ3YjM3OWJiZGQ0MDE4MjJkYzgyOWFlNmRlMzYxMyIsInN1YiI6IjY1MmRkZjE2Y2FlZjJkMDBmZjUzMzNiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ic-8Kvdhlt38LmfCxkQgl8OgbKa_GNsLcjNvz9BlSHM'
    }
};
      
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', genres)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
// APIs -->

// quiz questions
var quizquestions = [
    {
        question: "How are you feeling today?",
        answer: [
            { answer1: "sad" },
            { answer2: "happy" },
            { answer3: "scared" },
            { answer4: "angry" },
            { answer5: "shocked" } ,
        ],
        
    },
];


