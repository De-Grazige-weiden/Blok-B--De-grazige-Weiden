let hamburger
let navMenu
let txt

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

function nieuwsbriefFunction() {
    if (confirm) {
      txt = "U bent nu succesvol aangemeldt voor de nieuwsbrief! U kunt nu wekelijks email verwachten die u op de hoogte houdt van belangrijke veranderingen op camping de groene weide!";
    } 
    document.getElementById("nieuwsbriefpopup").innerHTML = txt;
  }






