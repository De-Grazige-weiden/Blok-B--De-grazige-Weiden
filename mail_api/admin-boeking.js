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
        <p>Gegevens:<b> Voornaam:${data.voornaam} – <b>Tussenvoegsel:<b> ${data.tussenvoegsel} – <b>Achternaam:<b> ${data.achternaam} – <b>Telefoonnummer:<b> ${data.telefoonnummer} – <b>Email:<b> ${data.email} </p>
        <p><b>Verblijfssoort:<b> ${data.verblijfssoort} – <b>Aankomstdatum:<b> ${data.aankomstdatum} <b>Vertrekdatum:<b> ${data.vertrekdatum} – <b>Aantal personen:<b> ${data.aantalpersonen} <b>ID:<b> ${data.ID} </p>
        <button id="modify" class="modify">Wijzigen</button>
        <button id="cancel" class="cancel">Annuleren</button> 

        <form id="bookingForm">
            <label>
                Verblijfssoort:
                <input type="text" id="verblijfssoort" name="verblijfssoort">
            </label>
            <label>
                Aankomst Datum:
                <input type="date" id="aankomstDatum" name="aankomstDatum">
            </label>
            <label>
                Vertrek Datum:
                <input type="date" id="vertrekDatum" name="vertrekDatum">
            </label>
            <label>
                Aantal Personen:
                <input type="number" id="aantalPersonen" name="aantalPersonen">
            </label>
            <label>
                Voorkeuren:
                <input type="text" id="voorkeuren" name="voorkeuren">
            </label>
            <label>
                Voornaam:
                <input type="text" id="voorNaam" name="voorNaam">
            </label>
            <label>
                Achternaam:
                <input type="text" id="achterNaam" name="achterNaam">
            </label>
            <label>
                Tussenvoegsel:
                <input type="text" id="tussenVoegsel" name="tussenVoegsel">
            </label>
            <label>
                Telefoonnummer:
                <input type="tel" id="phoneNumber" name="phoneNumber">
            </label>
            <label>
                Email:
                <input type="email" id="email" name="email">
            </label>
            
            <input type="submit" value="Wijzigen">
            <input id="annuleren" type="submit" value="Annuleren">
        </form>
    </div>
      `;
      container.appendChild(element);

    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


const button = document.querySelector('#modify') 
 
button.addEventListener('click', e => { 
	document.getElementById('modify').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
}) 


document.getElementById('modify').addEventListener('click', function() {
    document.getElementById('bookingForm').style.display = 'block'; // Toon het formulier
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Dezelfde code als voorheen om de form data te verwerken

    document.getElementById('bookingForm').style.display = 'none'; // Verberg het formulier weer
    document.getElementById('annuleren').style.display = 'none';
});


