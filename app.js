// DOM Elements
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const movieModal = document.getElementById('movieModal');
const plansContainer = document.getElementById('plans');
const faqContainer = document.getElementById('faq');

// Sample Data
const movies = [
  {
    id: 1,
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    posterUrl: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
    genre: ["Drama", "Fantasy", "Adventure"],
    trailerUrl: "https://www.youtube.com/watch?v=KPLWWIOCOOQ"
  },
  // Add more movies here
];

const subscriptionPlans = [
  {
    name: "Basic",
    price: "$8.99",
    quality: "Good",
    resolution: "720p",
    devices: ["Phone", "Tablet", "Computer", "TV"]
  },
  {
    name: "Standard",
    price: "$13.99",
    quality: "Better",
    resolution: "1080p",
    devices: ["Phone", "Tablet", "Computer", "TV"]
  },
  {
    name: "Premium",
    price: "$17.99",
    quality: "Best",
    resolution: "4K+HDR",
    devices: ["Phone", "Tablet", "Computer", "TV"]
  }
];

const faqQuestions = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month."
  },
  // Add more FAQ items
];

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.style.backgroundColor = 'rgb(0, 0, 0)';
  } else {
    navbar.style.backgroundColor = 'transparent';
  }
});

// Hero Section
function updateHero(movie) {
  hero.innerHTML = `
    <div class="relative h-full">
      <img src="${movie.backdropUrl}" alt="${movie.title}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent">
        <div class="container mx-auto px-4 h-full flex items-center">
          <div class="max-w-2xl">
            <h1 class="text-5xl font-bold mb-4">${movie.title}</h1>
            <p class="text-lg text-gray-200 mb-8">${movie.description}</p>
            <div class="flex gap-4">
              <button onclick="playMovie('${movie.trailerUrl}')" class="play-button">
                ▶ Play
              </button>
              <button onclick="showMovieInfo(${movie.id})" class="info-button">
                ℹ More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Movie Modal
function showMovieModal(movie) {
  movieModal.style.display = 'block';
  movieModal.innerHTML = `
    <div class="modal-content slide-up">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div class="modal-body">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <div class="modal-info">
          <span>${movie.genre.join(', ')}</span>
        </div>
      </div>
    </div>
  `;
}

function closeModal() {
  movieModal.style.display = 'none';
}

// Subscription Plans
function renderPlans() {
  plansContainer.innerHTML = subscriptionPlans.map(plan => `
    <div class="plan-card fade-in">
      <h3>${plan.name}</h3>
      <div class="plan-price">${plan.price}</div>
      <div class="plan-features">
        <p>Video quality: ${plan.quality}</p>
        <p>Resolution: ${plan.resolution}</p>
        <p>Devices: ${plan.devices.join(', ')}</p>
      </div>
      <button class="plan-button">Choose Plan</button>
    </div>
  `).join('');
}

// FAQ Section
function renderFAQ() {
  faqContainer.innerHTML = faqQuestions.map((item, index) => `
    <div class="faq-item">
      <div class="faq-question" onclick="toggleFAQ(${index})">
        ${item.question}
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-answer" id="faq-answer-${index}">
        ${item.answer}
      </div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const isOpen = answer.style.height !== '0px' && answer.style.height !== '';
  
  // Close all other answers
  document.querySelectorAll('.faq-answer').forEach(el => {
    el.style.height = '0px';
  });
  
  // Toggle current answer
  if (!isOpen) {
    answer.style.height = answer.scrollHeight + 'px';
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  updateHero(movies[0]); // Set featured movie
  renderPlans();
  renderFAQ();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === movieModal) {
    closeModal();
  }
});
