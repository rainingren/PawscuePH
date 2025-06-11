document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const paginationDotsContainer = document.getElementById('carouselPagination');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Function to update the carousel display
    function updateCarousel() {
        const offset = -currentIndex * (100 / totalSlides); // Calculate percentage offset
        carouselContainer.style.transform = `translateX(${offset}%)`;
        updatePaginationDots();
        updateArrowStates();
    }

    // Function to create and update pagination dots
    function updatePaginationDots() {
        paginationDotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            paginationDotsContainer.appendChild(dot);
        }
    }

    // Function to update arrow states (enabled/disabled)
    function updateArrowStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalSlides - 1;
    }

    // Event listeners for navigation arrows
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initial carousel setup
    updateCarousel();
});