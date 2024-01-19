//------------------fetch API--------------------

fetch('http://localhost:8080/api/boekingen')
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

      <p>Gegevens: <strong>Voornaam:</strong> ${data.voornaam} – <strong>Tussenvoegsel:</strong> ${data.tussenvoegsel} – <strong>Achternaam:</strong> ${data.achternaam} – <strong>Telefoonnummer:</strong> ${data.telefoonnummer} – <strong>Email:</strong> ${data.email} </p>

      <p><strong>Verblijfssoort:</strong> ${data.verblijfssoort} – <strong>Aankomstdatum:</strong> ${data.aankomstdatum} – <strong>Vertrekdatum:</strong> ${data.vertrekdatum} – <strong>Aantal personen:</strong> ${data.aantalpersonen} – <strong>Boekingsnummer:</strong> ${data.ID} </p>

      <button id="modify" class="modify">Wijzigen</button>
      <button id="cancel" class="cancel">Annuleren</button>
      
          <form class="bookingForm2" id="bookingForm2">
            <label>
                Boekingsnummer:
                <input type="number" id="id" name="ID">
            </label>
            <p><b>Weet u het zeker dat u de boeking wilt verwijderen?</b></p>
            <input class="verwijderen" id="verwijderen" type="submit" value="Verwijderen">
            <input class="annuleren2" id="annuleren2" type="button" value="Annuleren">
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
          <input class="annuleren" id="annuleren" type="button" value="Annuleren">
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


//------------------annuleren knop--WIJZIGEN------------------------
const eersteKnop = document.querySelectorAll('#annuleren');

eersteKnop.forEach((knop) => {
  knop.addEventListener('click', function(e) {
    formWijzigen.forEach((form) => {
      form.style.display = 'none';
    });
  });
});

//------------------annuleren knop--ANNULEREN------------------------
const tweedeKnop = document.querySelectorAll('#annuleren2');

tweedeKnop.forEach((knop) => {
  knop.addEventListener('click', function(e) {
    formVerwijderen.forEach((form) => {
      form.style.display = 'none';
    });
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

    fetch("http://localhost:8080/api/klanten/boekingen/wijzigen/:id", {
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

    fetch("http://localhost:8080/api/klanten/boekingen/verwijderen/:id", {
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