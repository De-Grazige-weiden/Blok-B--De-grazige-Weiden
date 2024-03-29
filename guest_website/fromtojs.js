document.getElementById('reserveringsFormulier').addEventListener('submit', function(e) {
  e.preventDefault();

  var formData = new FormData(e.target);
  var object = {};
  formData.forEach(function(value, key){
    object[key] = value;
  });
  var json = JSON.stringify(object);

  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  });
});
