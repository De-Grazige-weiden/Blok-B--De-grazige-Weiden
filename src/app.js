const express = require('express');
const app = express();
app.use(express.json());
var nodemailer = require('nodemailer');

//--------------------database------------
//var mysql = require('mysql');
//
//const db = mysql.createConnection ({
//  user:"root",
//  host: "localhost",
//  password: "password",
//  database: "",
//});
//
//db.connect((err) => {
//  if (err) {
//    throw err;
//  }
//  console.log('Connected to database');
//});

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
      text: `Beste ${klant.voornaam},

Bedankt voor uw reservering! Hier zijn uw reserveringsgegevens:

Verblijfssoort: ${klant.verblijfssoort}
Reserveringsdatum: ${klant.reserveringsDatum}
Aantal personen: ${klant.aantalPersonen}

We kijken ernaar uit u te verwelkomen!

Met vriendelijke groet,

Aleksander van Santen (Medewerker De Groene Weide)`
  };
}

app.post('/send-email', function(req, res) {
  let klant = req.body;

  let mailOptions = createMailOptions(klant);

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

app.post('/klanten/boekingen/:id', (req, res) => {
  const klantId = req.params.id;
  const booking = {
    klantId: klantId,
    verblijfssoort: req.body.verblijfssoort,
    aankomstEnVertrek: req.body.aankomstEnVertrek,
    aantalPersonen: req.body.aantalPersonen,
    voorkeuren: req.body.voorkeuren,
    voorNaam: req.body.voorNaam,
    achterNaam: req.body.achterNaam,
    tussenVoegsel: req.body.tussenVoegsel,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const sql = 'INSERT INTO bookings SET ?';

  db.query(sql, booking, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Er is een fout opgetreden bij het verwerken van uw verzoek.' });
      return;
    }
    res.send('<script>alert("Uw boeking is succesvol verwerkt!"); window.location.href="/";</script>');
  });
});


app.patch('/klanten/boekingen/:id', (req, res) => {
res.send('jo men');
});