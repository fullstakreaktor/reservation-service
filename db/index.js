const dbconfig = require('opsworks');
const local = require('./db.config.js');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: dbconfig.db['host'] || local.host,
  user: dbconfig.db['username'] || local.user,
  password: dbconfig.db['password'] || local.password,
  port: dbconfig.db['port'] || local.port,
  database: dbconfig.db['database'] || local.database
});


const getListingById = (id, callback) => {
  const queryStr = 'SELECT * from listings WHERE id = ?';
  db.query(queryStr, id, callback);
};

const getBookedDatesByListingId = (id, callback) => {
  const queryStr = 'SELECT check_in, check_out FROM booked_dates WHERE listing_id = ?';
  db.query(queryStr, id, callback);
};

const postNewBookedDates = (data, callback) => {
  const queryStr = 'INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES (?)';
  db.query(queryStr, [[data.listingId, data.checkIn, data.checkOut]], callback);
};

const postNewReservation = ({
  guestId, bookedDatesId, guests, total,
}, callback) => {
  const queryStr = 'INSERT INTO reservations '
    + '(guest_id, booked_dates_id, total_adults, total_pups, total_charge) VALUES (?)';
  const values = [guestId, bookedDatesId, guests.adults, guests.pups, total];
  db.query(queryStr, [values], callback);
};

const deleteBookedDatesById = (id, callback) => {
  const queryStr = 'DELETE FROM booked_dates WHERE id = ?';
  db.query(queryStr, id, callback);
};


module.exports = {
  getListingById,
  getBookedDatesByListingId,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
};
