let myForm = document.getElementById('login')
myForm.onclick=(e)=>{
    e.preventDefault()
    let email = document.querySelectorAll('input')[0].value
    let password = document.querySelectorAll('input')[1].value

    //Accessing the local storage data to check the credentials of the user
    let storedData = JSON.parse(localStorage.getItem('userData'))
    
    //checking if the email and password is correct
    if(email===storedData.email && password===storedData.Password){
        alert("Login Successful")
        //Render to Home page if credentials are correct
        window.location.href='../HomePage.html'
    } else {
        alert("Invalid Credentials")
    }
}