document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    menuToggle.addEventListener('click', function() {
        body.classList.toggle('mobile-menu-active');
    });
    
    const dishesSlider = document.querySelector('.dishes-slider');
    const dishes = document.querySelectorAll('.dish');
    const prevButton = document.getElementById('prev-dish');
    const nextButton = document.getElementById('next-dish');
    
    let currentPosition = 0;
    const dishWidth = 330; // dish width + margin
    const maxPosition = (dishes.length - 1) * dishWidth;
    
    function updateSliderPosition() {
        dishesSlider.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    nextButton.addEventListener('click', function() {
        if (currentPosition < maxPosition) {
            currentPosition += dishWidth;
        } else {
            currentPosition = 0;
        }
        updateSliderPosition();
    });
    
    prevButton.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition -= dishWidth;
        } else {
            currentPosition = maxPosition;
        }
        updateSliderPosition();
    });
    
    setInterval(function() {
        if (currentPosition < maxPosition) {
            currentPosition += dishWidth;
        } else {
            currentPosition = 0;
        }
        updateSliderPosition();
    }, 5000);
    
    const reservationForm = document.getElementById('reservation-form');
    
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Reservation submitted successfully! We will contact you shortly to confirm.');
        reservationForm.reset();
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});