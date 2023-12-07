
const gegevensform = document.getElementById('gegevensform');
const vakantieform = document.getElementById('vakantieform');

gegevensform.addEventListener('submit', event => {
  event.preventDefault();

  var gegevensformData = new FormData(gegevensform);
  var vakantieformData = new FormData(vakantieform);
  var object = {};

  gegevensformData.forEach(function (value, key) {
    object[key] = value;
  });

  vakantieformData.forEach(function (value, key) {
    object[key] = value;
    
  });
  var json = JSON.stringify(object);

  console.log(json);

  const response = fetch("http://localhost:5500/send-email", {
    method: "POST",
    headers:
    {
      'Content-Type': 'application/json',
    },
    body: json,
  });


//  fetch('/klanten/boekingen/:id', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: json
//  })
});






//form.addEventListener('submit', event => {
//  event.preventDefault();
//
//  var formData = new FormData(form);
//  var object = {};
//  formData.forEach(function(value, key){
//    object[key] = value;
//  });
//  var json = JSON.stringify(object);
//
//  console.log(json);
//
//  fetch('/klanten/boekingen/:id', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: json
//  })
//});