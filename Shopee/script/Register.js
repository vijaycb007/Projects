let myForm = document.getElementById("register");
myForm.onclick = (e) => {
  e.preventDefault();
  let inputBox = document.querySelectorAll("input");
  let formData = {};
  //creating a empty object to store the data as an object
  inputBox.forEach((input) => {
    //radio button will take the value as 'Others' so we have to check and validate the data
    if (input.type === "radio") {
      if (input.checked) {
        //to print radio button value
        formData[input.name] = input.value;
      }
    } else {
      // to print other value
      formData[input.name] = input.value;
    }
  });
  //Store the data in Local Storage and converting normal object to JSON object
  localStorage.setItem('userData', JSON.stringify(formData));
  //Confirmation of Successfull registration
  alert("User Registered Successfully");
  //After successfull registration render to Login page
  window.location.href = "../Login.html";
};
