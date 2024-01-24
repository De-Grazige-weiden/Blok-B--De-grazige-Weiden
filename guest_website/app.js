
//const express = require('express');
//const app = express();
//app.use(express.json());
//
//var nodemailer = require('nodemailer');
//
//var transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//
//  }
//});
//
//function createMailOptions(klant) {
//  return {
//      from: 'aleksvansanten@gmail.com',
//      to: klant.email,
//      subject: 'Bevestiging van Reservering',
//      text: `Beste ${klant.naam},
//
//Bedankt voor uw reservering! Hier zijn uw reserveringsgegevens:
//
//Verblijfssoort: ${klant.verblijfssoort}
//Reserveringsdatum: ${klant.reserveringsDatum}
//Aantal personen: ${klant.aantalPersonen}
//
//We kijken ernaar uit u te verwelkomen!
//
//Met vriendelijke groet,
//
//Aleksander van Santen (Medewerker De Groene Weide)`
//  };
//}
//
//app.post('/send-email', function(req, res) {
//  let klant = req.body;
//
//  let mailOptions = createMailOptions(klant);
//
//  transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//      console.log(error);
//      res.status(500).send(error);
//    } else {
//      console.log('Email sent: ' + info.response);
//      res.status(200).send('Email sent: ' + info.response);
//    }
//  });
//});
//
//app.listen(5500, function() {
//  console.log('Server is running on port 3000');
//});
//
//

const express = require('express');
const app = express();
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
      text: `Beste ${klant.naam},

Bedankt voor uw reservering! Hier zijn uw reserveringsgegevens:

Verblijfssoort: ${klant.verblijfssoort}
Reserveringsdatum: ${klant.reserveringsDatum}
Aantal personen: ${klant.aantalPersonen}

We kijken ernaar uit u te verwelkomen!

Met vriendelijke groet,

Aleksander van Santen (Medewerker De Groene Weide)`
  };
}

let klant = {
  email: "aleksvansanten@gmail.com",
  naam: "Jan Jansen",
  verblijfssoort: "Tent",
  reserveringsDatum: "24 november",
  aantalPersonen: 4
};

let mailOptions = createMailOptions(klant);

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});


//app.get('/', (req, res) => {
// res.send ('Hello world');
//});
//
//app.get('/api/courses', (req, res) => {
// res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//});
//
//
//const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}...`))//
