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

      <p><b>Verblijfssoort:<b> ${data.verblijfssoort} – <b>Aankomstdatum:<b> ${data.aankomstdatum} – <b>Vertrekdatum:<b> ${data.vertrekdatum} – <b>Aantal personen:<b> ${data.aantalpersonen} – <b>Boekingsnummer:<b> ${data.ID} </p>

      <button id="modify" class="modify">Wijzigen</button>
      <button id="cancel" class="cancel">Annuleren</button>
      
          <form class="bookingForm2" id="bookingForm2">
            <label>
                Boekingsnummer:
                <input type="number" id="id" name="ID">
            </label>
            <p>Weet u het zeker dat u de boeking wilt verwijderen?</p>
            <input class="verwijderen" id="verwijderen" type="submit" value="Verwijderen">
            <input class="annuleren2" id="annuleren2" type="submit" value="Annuleren">
          </form>

        <form class="bookingForm" id="bookingForm">
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
              <input type="tel" id="phoneNumber" name="telefoonnummer" pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{2}" placeholder="06-123-456-78">
          </label>
          <label>
              Email:
              <input type="email" id="email" name="email">
          </label>
          <label>
              Boekingsnummer:
              <input type="number" id="id" name="ID">
          </label>
          
          <input class="wijzigen" id="wijzigen" type="submit" value="Wijzigen">
          <input class="annuleren" id="annuleren" type="submit" value="Annuleren">
        </form>
    </div>
      `;
      container.appendChild(element);

const modifyButtons = document.querySelectorAll('.modify');
const cancelButtons = document.querySelectorAll('.cancel');

//-------------------WIJZIGEN BUTTON-------------------------------
modifyButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Verberg de huidige knop en de volgende knop
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'none';
    
    // Toon het juiste formulier
    e.target.parentElement.querySelector('.bookingForm').style.display = 'block';
  });
});

formWijzigen = document.querySelectorAll('.bookingForm');
formVerwijderen = document.querySelectorAll('.bookingForm2');

formWijzigen.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none'; // Verberg het formulier weer
    if (form.nextElementSibling) {
      form.nextElementSibling.style.display = 'none';
  }
  });
});

//-------------------VERWIJDEREN BUTTON-------------------------------
cancelButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Verberg de huidige knop en de volgende knop
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'none';

    // Toon het juiste formulier
    e.target.parentElement.querySelector('.bookingForm2').style.display = 'block';
  });
});

formVerwijderen.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none'; // Verberg het formulier weer
    if (form.nextElementSibling) {
      form.nextElementSibling.style.display = 'none';
  }
  });
});

const bookingForms = document.querySelectorAll('.bookingForm, .bookingForm2');

bookingForms.forEach((form) => {
  form.addEventListener('submit', function(e) {

    form.style.display = 'none';
  });
});


    //---------------FETCH verzoek naar API voor WIJZIGEN----------------------
    const bookingForm = document.querySelectorAll('.bookingForm');
    const bookingForms2 = document.querySelectorAll('.bookingForm2');

    bookingForm.forEach((form) => {
    form.addEventListener('submit', (event) => {
    event.preventDefault();

    var bookingformData = new FormData(form);
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

    bookingForms2.forEach((form) => {
    form.addEventListener('submit', (event) => {
    event.preventDefault();

    var bookingformData = new FormData(form);
    var object = {};

    bookingformData.forEach(function (value, key) {
      object[key] = value;
    });

    var json = JSON.stringify(object);

    console.log(json);

    fetch("http://localhost:5500/api/klanten/boekingen/verwijderen/:id", {
        method: "DELETE",
        headers:
        {
            'Content-Type': 'application/json',
        },
        body: json,
      });
  });
});


    });
  })

  .catch(error => {
    console.error('Error fetching data:', error);
  });