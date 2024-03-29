
//---------------------------VERZOEK VOOR MAIL EN BOEKING AANMAKEN-----------------
const vakantieform = document.getElementById('vakantieform')

  vakantieform.addEventListener('submit', event => {
  event.preventDefault();

  var vakantieformData = new FormData(vakantieform);
  var object = {};

  vakantieformData.forEach(function (value, key) {
    object[key] = value;
  });
  
  var json = JSON.stringify(object);

  console.log(json);

  fetch("http://localhost:8080/api/send-email", {
    method: "POST",
    headers:
    {
      'Content-Type': 'application/json',
    },
    body: json,
  });

  fetch("http://localhost:8080/api/klanten/boekingen", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  });
});