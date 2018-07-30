const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const utils = require('./utils.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(3003, () => console.log('Listening at localhost:3003'));


app.get('/api/:collection/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = null;
  if (req.params.collection === 'listings') {
    method = db.getListingById;
  } else if (req.params.collection === 'dates') {
    method = db.getBookedDatesByListingId;
  } else {
    res.status(400).end('Invalid endpoint');
  }

  method(req.params.listingId, (err, result) => {
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else if (result.length === 0) {
      res.status(404).send('No such listing!');
    } else res.send(result);
  });
});


app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
  const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      data.bookedDatesId = result.insertId;
      db.postNewReservation(data, (error, reservation) => {
        if (err) {
          db.deleteBookedDatesById(result.insertId, () => {
            res.status(500).send({ err: 'Failed to post reservation' });
          });
        } else res.status(201).send(reservation);
      });
    }
  });
});
