const submit_btn = document.querySelector('.button');
const email = document.querySelector('.text');
const emailErr = document.querySelector('.error');


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
  let typeMismatched = email.validity.typeMismatch;
  let lengthIncorrect = email.value.length < 1;

  return new Promise((resolve, reject) => {
    if (typeMismatched) {
      console.log('Not an email');
      reject((() => {
        emailErr.className = 'error active';
        emailErr.innerHTML = "Invalid email";
      })());
    } else if (lengthIncorrect) {
      console.log('Lenght < 1');
      reject((() => {
        emailErr.className = 'error active';
        emailErr.innerHTML = "Please enter an email";
      })());
    }
    else {
      console.log('Email is valid');
      resolve((() => {
        emailErr.className = 'error active success';
        emailErr.innerHTML = "Email registered successfully!";
        email.value = '';
      })());
    }
  });
}


const sendData = () => {
  validateEmail().then((message) => {
    // message();
    sendHttpRequest('POST', 'https://boltesapi.herokuapp.com/api/emails', {
      "email": email.value
    })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err);
      });
  }).catch((error) => {
  });
};
submit_btn.addEventListener("click", sendData);