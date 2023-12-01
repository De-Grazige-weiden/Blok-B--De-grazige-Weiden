
const express = require('express');
const app = express();
app.use(express.json());

var nodemailer = require('nodemailer');

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

