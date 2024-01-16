//--------------------LOGIN----------------------------

const form = document.querySelector(".login")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username,password)

    if(authenticated){
        window.location.href = "admin-boeking.html"
    }else{
        alert("wrong")
    }
})

// function for checking username and password

function authentication(username,password){
    if(username === "bert.grazeweide@gmail.nl" && password === "grazeweide"){
        return true
    }else{
        return false
    }
}