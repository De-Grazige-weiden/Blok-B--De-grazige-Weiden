//------------------fetch API--------------------

fetch('http://localhost:5500/api/boekingen')
  .then(response => response.json())
  .then(data => { // 'data' is nu de array van boekingen
  console.log(data);

    let container = document.getElementById('container');
    
    data.forEach(data => {
      let element = document.createElement('div');
      element.setAttribute('data-name', data.name);
      element.innerHTML = `
      <div class="booking">
      <h2>Boeking ${data.ID} </h2>
      <p>Gegevens:<b> Voornaam: ${data.voornaam} – Tussenvoegsel:<b> ${data.tussenvoegsel} – <b>Achternaam:<b> ${data.achternaam} – <b>Telefoonnummer:<b> ${data.telefoonnummer} – <b>Email:<b> ${data.email} </p>
      <p><b>Verblijfssoort:<b> ${data.verblijfssoort} – <b>Aankomstdatum:<b> ${data.aankomstdatum} <b>Vertrekdatum:<b> ${data.vertrekdatum} – <b>Aantal personen:<b> ${data.aantalpersonen} <b>Boekingsnummer:<b> ${data.ID} </p>
      <button id="modify" class="modify">Wijzigen</button>
      <button id="cancel" class="cancel">Annuleren</button> 

      <form id="bookingForm">
          <label>
              Verblijfssoort:
              <input type="text" id="verblijfssoort" name="verblijfssoort">
          </label>
          <label>
              Aankomst Datum:
              <input type="date" id="aankomstDatum" name="aankomstdatum">
          </label>
          <label>
              Vertrek Datum:
              <input type="date" id="vertrekDatum" name="vertrekdatum">
          </label>
          <label>
              Aantal Personen:
              <input type="number" id="aantalPersonen" name="aantalpersonen">
          </label>
          <label>
              Voorkeuren:
              <input type="text" id="voorkeuren" name="voorkeuren">
          </label>
          <label>
              Voornaam:
              <input type="text" id="voorNaam" name="voornaam">
          </label>
          <label>
              Achternaam:
              <input type="text" id="achterNaam" name="achternaam">
          </label>
          <label>
              Tussenvoegsel:
              <input type="text" id="tussenVoegsel" name="tussenvoegsel">
          </label>
          <label>
              Telefoonnummer:
              <input type="tel" id="phoneNumber" name="phonenumber">
          </label>
          <label>
              Email:
              <input type="email" id="email" name="email">
          </label>
          <label>
              Boekingsnummer:
              <input type="number" id="id" name="ID">
          </label>
          
          
          <input type="submit" value="Wijzigen">
          <input id="annuleren" type="submit" value="Annuleren">
      </form>
   </div>
      `;
      container.appendChild(element);

      const button = document.querySelector('#modify') 
 
        button.addEventListener('click', e => { 
          document.getElementById('modify').style.display = 'none';
          document.getElementById('cancel').style.display = 'none';
      }); 
    
      document.getElementById('modify').addEventListener('click', function() {
        document.getElementById('bookingForm').style.display = 'block'; // Toon het formulier
    });
    
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Dezelfde code als voorheen om de form data te verwerken
    
        document.getElementById('bookingForm').style.display = 'none'; // Verberg het formulier weer
        document.getElementById('annuleren').style.display = 'none';
    });

    //---------------FETCH verzoek naar API voor DELETE en WIJZIGEN---------

const bookingform = document.getElementById('bookingForm')

bookingform.addEventListener('submit', event => {
event.preventDefault();

var bookingformData = new FormData(bookingform);
var object = {};

bookingformData.forEach(function (value, key) {
  object[key] = value;
});

var json = JSON.stringify(object);

console.log(json);

 fetch("http://localhost:5500/api/klanten/boekingen/wijzigen/:id", {
    method: "PATCH",
    headers:
    {
        'Content-Type': 'application/json',
    },
    body: json,
 });
});


    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });







