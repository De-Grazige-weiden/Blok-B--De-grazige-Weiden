//--------------------LOGIN----------------------------

const form = document.querySelector(".login")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const email = form.email.value
    const password = form.password.value

    const authenticated = authentication(email,password)

    if(authenticated){
        window.location.href = "medewerkerboekingen.html"
    }else{
        alert("wrong")
    }
})

function authentication(email,password){
    if(email === "bert.grazeweide@gmail.nl" && password === "grazeweide"){
        return true
    }else{
        return false
    }
}
