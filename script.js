
const submit_btn = document.querySelector('.button');
const email = document.querySelector('.text');
const emailErr = document.querySelector('.error');
const loader = document.querySelector('.loader');


const checkEmail = () => {
  let typeMismatched = email.validity.typeMismatch;
  let lengthIncorrect = email.value.length < 1;
  return new Promise((resolve, reject) => {
    if (typeMismatched || lengthIncorrect) {
      reject('INVALID EMAIL', (() => {
        emailErr.className = 'error active';
        emailErr.innerHTML = "Invalid email";
      })());
    } else {
      resolve('VALID EMAIL');
    }
  });
};

const reqHandler = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    checkEmail().then(() => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.responseType = 'json';

      xhr.setRequestHeader('Content-Type', 'application/json');
      loader.className = 'loader active';
      emailErr.innerHTML = '';
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response, (() => {
          emailErr.className = 'error active success';
          emailErr.innerHTML = "Email registered successfully!";
        })());
        }
      };

      xhr.onerror = () => {
        reject('Something went wrong!', (() => {
          emailErr.className = 'error active';
          emailErr.innerHTML = "Connection Error";
        })());
      };

      xhr.send(JSON.stringify(data));
    }).catch((err) => {
      console.log(err);
    });
  });
  return promise;
};

const sendData = () => {
  reqHandler('POST', 'https://boltesapi.herokuapp.com/api/emails', {
    "email": email.value
  }).then((msg) => {
    console.log(msg);
    loader.className = '';
  }).catch((err) => {
    console.log(err);
    loader.className = '';
  });
  
};

submit_btn.addEventListener("click", sendData);
