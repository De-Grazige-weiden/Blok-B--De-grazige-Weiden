let hamburger
let navMenu

window.addEventListener("DOMContentLoaded", function() {
    hamburger = document.querySelector(".hamburger");
    navMenu = document.querySelector(".nav-menu");

    navButton_setup()
});

function navButton_setup () {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".nav-barlink").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))
}

