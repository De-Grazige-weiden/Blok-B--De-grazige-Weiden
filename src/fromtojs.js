
const form = document.getElementById('formtitle');

form.addEventListener('submit', event => {
  event.preventDefault();

  var formData = new FormData(form);
  var object = {};
  formData.forEach(function(value, key){
    object[key] = value;
  });
  var json = JSON.stringify(object);

  console.log(json);

  fetch('https://localhost:5500/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  });

  fetch('https://localhost:5500/klanten/boekingen/:id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  })
});


form.addEventListener('submit', event => {
  event.preventDefault();

  var formData = new FormData(e.target);
  var object = {};
  formData.forEach(function(value, key){
    object[key] = value;
  });
  var json = JSON.stringify(object);

  console.log(json);

  fetch('/klanten/boekingen/:id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  })
});