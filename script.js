let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let contactForm = document.getElementById('contact-form'); // Get contact form
let formStatus = document.getElementById('form-status'); // Get status div

// Function to close search and login forms
function closeForms() {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    loginForm.classList.remove('active');
}

// Function to close mobile menu
function closeMenu() {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// Close menu, search, login on scroll
window.onscroll = () =>{
    closeForms();
    closeMenu();
}

// Toggle search bar
searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
    // Close menu and login if search is opened
    closeMenu();
    loginForm.classList.remove('active');
});

// Toggle mobile menu
menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
     // Close search and login if menu is opened
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    loginForm.classList.remove('active');
});

// Show login form
formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
    // Close menu and search if login is opened
    closeMenu();
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
});

// Close login form
formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

// Home section video controls
videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

// Initialize Swiper for Reviews
var reviewSwiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 3500, // Slower autoplay
        disableOnInteraction: false,
    },
    pagination: { // Add pagination
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

// Initialize Swiper for Brands
var brandSwiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});


// --- Optional: Formspree Contact Form Handling ---
// This provides better UX by showing success/error messages without redirecting
// Make sure your form action is set correctly in HTML

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default redirect
    formStatus.innerHTML = 'Sending...'; // Show temporary status
    const data = new FormData(event.target);
    try {
        const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "Thanks for your submission!";
            contactForm.reset(); // Clear the form
        } else {
            // Try to get error message from Formspree response
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                formStatus.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.innerHTML = "Oops! There was a problem submitting your form";
            }
        }
    } catch (error) {
        formStatus.innerHTML = "Oops! There was a problem submitting your form";
    }
     // Optional: Clear status message after a few seconds
     setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
}

if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
}
// --- End Formspree Handling ---