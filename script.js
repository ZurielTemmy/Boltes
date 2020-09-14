// const { rejects } = require("assert");
// const { resolve } = require("path");

const submit_btn = document.querySelector('.button');
const email = document.querySelector('.text');
const emailErr = document.querySelector('.error');

const handleEmailErr = (type) => {
  if (type == "validate") {
    emailErr.className = 'error active';
    emailErr.innerHTML = "Invalid email";
  } else if (type == "length") {
    emailErr.className = 'error active';
    emailErr.innerHTML = "Please enter an email";
  }else if(type == "data sent"){
    emailErr.className = 'error active success';
    emailErr.innerHTML = "Email registered successfully!";
    email.value = '';
  }
  
};
const test = () => {
  if (email.validity.typeMismatch) {
    handleEmailErr("validate");
  } else if (email.value.length < 1) {
    handleEmailErr("length");
  } else {
    emailErr.innerHTML = '';
  }
  console.log(email.value);
};

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};
function validateEmail() {
  let isValid = true;
  if (email.validity.typeMismatch) {
    handleEmailErr("validate");
    isValid = false;
  } else if (email.value.length < 1) {
    handleEmailErr("length");
    isValid = false;
  } else {
    emailErr.innerHTML = '';
    isValid= true;
  }
  return isValid;
}

const sendData = () => {
  // let vEmail = validateEmail();
  if (validateEmail()) {
    sendHttpRequest('POST', 'https://boltesapi.herokuapp.com/api/emails', {
      "email": email.value
    })
      .then(responseData => {
        handleEmailErr("data sent");
        console.log(responseData);
      })
      .catch(err => {
        console.log(err);
      });
  } 
  // else {
  //   alert('Invalid email address');
  // }
};




// email.addEventListener('click', validateEmail);
submit_btn.addEventListener("click", sendData);

// userAction();