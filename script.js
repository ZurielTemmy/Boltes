// const { rejects } = require("assert");
// const { resolve } = require("path");

const submit_btn = document.querySelector('.button');
const email = document.querySelector('.text');

const test = () => {
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
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = re.test(String(email.value).toLowerCase());
  return validEmail;
}

const sendData = () => {
  // let vEmail = validateEmail();
  if (validateEmail()) {
    sendHttpRequest('POST', 'https://boltesapi.herokuapp.com/api/emails', {
      "email": email.value
    })
      .then(responseData => {
        alert('Thank You ');
        console.log(responseData);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    alert('Invalid email address');
  }
};




// email.addEventListener('click', validateEmail);
submit_btn.addEventListener("click", sendData);

// userAction();