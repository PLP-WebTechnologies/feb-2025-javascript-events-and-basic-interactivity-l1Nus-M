// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event Handling Section
    const clickButton = document.getElementById('clickButton');
    const hoverButton = document.getElementById('hoverButton');
    const keypressArea = document.getElementById('keypressArea');
    const keypressResult = document.getElementById('keypressResult');
    const secretButton = document.getElementById('secretButton');

    // Click event
    clickButton.addEventListener('click', () => {
        clickButton.textContent = 'Clicked!';
        setTimeout(() => {
            clickButton.textContent = 'Click Me!';
        }, 1000);
    });

    // Hover events
    hoverButton.addEventListener('mouseenter', () => {
        hoverButton.style.transform = 'scale(1.1)';
    });

    hoverButton.addEventListener('mouseleave', () => {
        hoverButton.style.transform = 'scale(1)';
    });

    // Keypress event
    keypressArea.addEventListener('keydown', (e) => {
        keypressResult.textContent = `You pressed: ${e.key}`;
    });

    // Secret button (double click and long press)
    let pressTimer;
    let clickCount = 0;

    secretButton.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            secretButton.classList.add('rainbow');
            secretButton.textContent = 'Long Press!';
        }, 1000);
    });

    secretButton.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
        if (!secretButton.classList.contains('rainbow')) {
            clickCount++;
            if (clickCount === 2) {
                secretButton.textContent = 'Double Click!';
                setTimeout(() => {
                    secretButton.textContent = 'Press Me!';
                    clickCount = 0;
                }, 1000);
            }
        } else {
            secretButton.classList.remove('rainbow');
            secretButton.textContent = 'Press Me!';
        }
    });

    // Interactive Elements Section
    const colorButton = document.getElementById('colorButton');
    const slides = document.querySelectorAll('.slide');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Color changing button
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;

    colorButton.addEventListener('click', () => {
        colorButton.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    });

    // Slideshow functionality
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlideHandler() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlideHandler() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    prevSlide.addEventListener('click', prevSlideHandler);
    nextSlide.addEventListener('click', nextSlideHandler);

    // Auto-advance slideshow
    setInterval(nextSlideHandler, 5000);

    // Initialize first slide
    showSlide(currentSlide);

    // Accordion functionality
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    // Form Validation Section
    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');

    // Real-time password strength indicator
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = strength < 50 ? '#e74c3c' : strength < 75 ? '#f1c40f' : '#2ecc71';
    });

    // Form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        // Password validation
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            hideError(passwordInput);
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthBar.style.width = '0%';
        }
    });

    // Helper functions for form validation
    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }

    function hideError(input) {
        const errorMessage = input.nextElementSibling;
        errorMessage.style.display = 'none';
        input.style.borderColor = '#ddd';
    }
}); 