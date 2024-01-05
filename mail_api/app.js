const express = require('express'); 
const cors = require('cors'); 
const app = express();  
app.use(express.json()); 
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ 
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1.admin:5500'] }));  

//--------------------database------------
var mysql = require('mysql');

const db = mysql.createConnection ({
  user:"root",
  host: "localhost",
  password: "",
  database: "database boekingen",
});

db.connect((err) => {
  if (err) {
    console.error('Fout bij het verbinden met de database:', err);
    process.exit(1);
  } else {
    console.log('Succesvol verbonden met de database');
  }
});

//--------------------------Mail API-------------------
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aleksvansanten@gmail.com',
    pass: 'ujwk mmsj pjvh sapf'
  }
});

function createMailOptions(klant) {
  return {

  from: 'aleksvansanten@gmail.com',
  to: klant.email,
  subject: 'Bevestiging van Reservering',
  text: 
  
  `Beste ${klant.voorNaam},

  Bedankt voor uw reservering! Hier zijn uw reserveringsgegevens:
  
  Verblijfssoort: ${klant.verblijfssoort}
  Aankomstdatum: ${klant.aankomstDatum}
  Vertrekdatum: ${klant.vertrekDatum}
  Aantal personen: ${klant.aantalPersonen}
  Voorkeuren: ${klant.voorkeuren}
  
  We kijken ernaar uit u te verwelkomen!
  
  Met vriendelijke groet,
  
  Aleksander van Santen (Medewerker De Groene Weide)`
  };
 }
 
 app.post('/api/send-email', function(req, res) {
 
  let mailOptions = createMailOptions(req.body);
 
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent: ' + info.response);
    }
  });
 });
 
 app.listen(5500, function() {
  console.log('Server is running on port 5500');
 });


//----------------------------- RESTFUL API---------------------------------------------

//----------------KLANT WEBSITE-----------BOEKING AANMAKEN EN VERSTUREN NAAR DB--------------------
app.post('/api/klanten/boekingen', (req, res) => {
  const postData = {
    verblijfssoort: req.body.verblijfssoort || null,
    aankomstDatum: req.body.aankomstDatum || null,
    vertrekDatum: req.body.vertrekDatum || null,
    aantalPersonen: req.body.aantalPersonen || null,
    voorkeuren: req.body.voorkeuren || null,
    voorNaam: req.body.voorNaam || null,
    achterNaam: req.body.achterNaam || null,
    tussenVoegsel: req.body.tussenVoegsel || null,
    telefoonNummer: req.body.telefoonNummer || null,
    email: req.body.email || null
  };
  
  var values = [postData.verblijfssoort, postData.aankomstDatum, postData.vertrekDatum, postData.aantalPersonen, postData.voorkeuren, postData.voorNaam, postData.achterNaam, postData.tussenVoegsel, postData.telefoonNummer, postData.email];
 
  var sql = 'INSERT INTO boeking (verblijfssoort, aankomstdatum, vertrekdatum, aantalpersonen, voorkeuren, voornaam, achternaam, tussenvoegsel, telefoonnummer, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err); // log the error to help identify the issue
      res.status(500).json({ error: 'Er is een fout opgetreden bij het verwerken van uw verzoek.' });
      return;
    }
    res.send('De gegevens zijn succesvol verwerkt!');
  });
  });



//----------------------ADMIN PAGINA---BOEKINGEN OPVRAGEN---------------------
app.get('/api/boekingen', (req, res) => {

  var sql = 'SELECT * FROM boeking';

  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).json({ error: 'Er is een fout opgetreden bij het verwerken van uw verzoek.' });
          return;
      }
      res.json(result);
  });
});

//----------------ADMIN PAGINA----------------------BOEKING WIJZIGEN EN STUREN NAAR DB----------------
app.patch('/api/klanten/boekingen/wijzigen/:id', (req, res) => {
  //const klantId = req.params.id;
  
    let verblijfssoort = req.body.verblijfssoort;
    let aankomstDatum = req.body.aankomstDatum;
    let vertrekDatum = req.body.vertrekDatum;
    let aantalPersonen = req.body.aantalPersonen;
    let voorkeuren = req.body.voorkeuren;
    let voorNaam = req.body.voorNaam;
    let achterNaam = req.body.achterNaam;
    let tussenVoegsel = req.body.tussenVoegsel;
    let telefoonNummer = req.body.telefoonNummer;
    let email = req.body.email;
    let id = req.body.ID;
  
  const sql = 'UPDATE boeking SET verblijfssoort = ?, aankomstdatum = ?, vertrekdatum = ?, aantalpersonen = ?, voorkeuren = ?, voornaam = ?, achternaam = ?, tussenvoegsel = ?, telefoonnummer = ?, email = ? WHERE ID = ?';

  db.query(sql, [verblijfssoort, aankomstDatum, vertrekDatum, aantalPersonen, voorkeuren, voorNaam, achterNaam, tussenVoegsel, telefoonNummer, email, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Er is een fout opgetreden bij het verwerken van uw verzoek.' });
      return;
    }
    res.send('De boeking is succesvol gewijzigd!');
  });
});

//------------------admin pagina--------boeking verwijderen--------------------
app.delete('/api/klanten/boekingen/verwijderen/:id', (req, res) => {
  
  let klantId = req.body.ID;

  const sql = 'DELETE FROM boeking WHERE ID = ?';

  db.query(sql, klantId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Er is een fout opgetreden bij het verwerken van uw verzoek.' });
      return;
    }
    res.send('De boeking is succesvol verwijderd!');
  });
});

