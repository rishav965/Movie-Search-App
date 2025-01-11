const apiKey = '2056452f'; // Replace with your OMDb API key
let currentPage = 1;
let totalResults = 0;

// Select DOM elements
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const moviesSection = document.getElementById('movies');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Fetch movies based on the search term and current page
const fetchMovies = async (query, page = 1) => {
  const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'True') {
    totalResults = parseInt(data.totalResults);
    displayMovies(data.Search);
    handlePagination(page);
  } else {
    moviesSection.innerHTML = '<p>No results found</p>';
  }
};

// Display movies in IMDb-like grid layout
const displayMovies = (movies) => {
  moviesSection.innerHTML = ''; // Clear previous results
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    
    movieCard.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" alt="${movie.Title}" />
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Type:</strong> ${movie.Type}</p>
        <a href="https://www.youtube.com/results?search_query=${movie.Title}+trailer" target="_blank">Watch Trailer</a>
      </div>
    `;
    
    moviesSection.appendChild(movieCard);
  });
};

// Handle search button click
searchBtn.addEventListener('click', () => {
  const query = searchBar.value.trim();
  if (query) {
    currentPage = 1; // Reset to the first page
    fetchMovies(query, currentPage);
  }
});

// Handle pagination
const handlePagination = (page) => {
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page * 10 >= totalResults;
  
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMovies(searchBar.value, currentPage);
    }
  };

  nextBtn.onclick = () => {
    if (currentPage * 10 < totalResults) {
      currentPage++;
      fetchMovies(searchBar.value, currentPage);
    }
  };
};


document.getElementById('search-btn').addEventListener('click', function() {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.style.animation = 'slideUp 1s ease-in-out';
});

document.getElementById('search-btn').addEventListener('click', function() {
  const searchBtn = document.getElementById('search-btn');
  searchBtn.classList.add('animate-big');

  // Remove the class after the animation ends
  setTimeout(() => {
    searchBtn.classList.remove('animate-big');
  }, 300); // Match the duration of the CSS transition
});
