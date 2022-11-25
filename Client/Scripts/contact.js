/* File Name: contact.js
Student Name: Ninghua Zhang
Student ID: 301230968
Date: 09/29/2022 */

//Validating message input

function messageValidity() {
  var validation = true;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  //regular expression for validating name
  var nameExpression = /^[a-zA-Z ]{2,30}$/;

  //regular expression for validating email that must contain the @ and . characters
  var emailExpression = /^\S+@\S+\.\S+$/;

  if (name == "") {
    document.getElementById("nameError").innerHTML = "You need to enter a name";
    validation = false;
  } else if (!nameExpression.test(name)) {
    document.getElementById("nameError").innerHTML =
      "Please enter a valid name";
    validation = false;
  } else {
    document.getElementById("nameError").innerHTML = "";
  }

  if (email == "") {
    document.getElementById("emailError").innerHTML =
      "You need to enter an email";
    validation = false;
  } else if (!emailExpression.test(email)) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid email, it must contain the @ and . characters";
    validation = false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  if (message == "") {
    document.getElementById("messageError").innerHTML =
      "You need to enter a message";
    validation = false;
  } else {
    document.getElementById("messageError").innerHTML = "";
  }

  if (validation) {
    alert(
      "Your message of \nName: " +
        name +
        "\nEmail: " +
        email +
        "\nMessage: " +
        message +
        "\nhas been sent successfully. I will get back to you as soon as possible"
    );
    window.location.href = "/home";
  }
}

function setUpPage() {
  document
    .getElementById("sendMessage")
    .addEventListener("click", messageValidity, false);
}

if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpPage);
}
