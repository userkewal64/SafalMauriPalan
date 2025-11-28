let index = 0;
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const totalSlides = slideImages.length;

let interval = setInterval(nextSlide, 2000); // autoplay every 2s
let isPlaying = true; // autoplay ON
const playPauseBtn = document.getElementById('playPauseBtn');

// Next slide function
function nextSlide() {
    index = (index + 1) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Previous slide function
function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Arrow button events
document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

// Reset interval when manually navigating with arrows
function resetInterval() {
    if (isPlaying) {
        clearInterval(interval);
        interval = setInterval(nextSlide, 2000);
    }
}

// Play / Pause button
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        clearInterval(interval);       // Stop autoplay
        playPauseBtn.textContent = '▶'; // Change to Play icon
    } else {
        interval = setInterval(nextSlide, 2000); // Start autoplay
        playPauseBtn.textContent = '⏸'; // Change to Pause icon
    }
    isPlaying = !isPlaying;
});
