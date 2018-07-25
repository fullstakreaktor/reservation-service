const db = require('./db.config.js');


const getListingById = (id, callback) => {
  let queryStr = 'SELECT * from listings WHERE id = ?';
  db.query(queryStr, id, callback);
};

const getBookedDatesByListingId = (id, callback) => {
  let queryStr = 'SELECT check_in, check_out FROM booked_dates WHERE listing_id = ?';
  db.query(queryStr, id, callback);
};

const postNewBookedDates = (data, callback) => {
  let queryStr = 'INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES (?)';
  db.query(queryStr, [[data.listingId, data.checkIn, data.checkOut]], callback);
};

const postNewReservation = (data, callback) => {
  let queryStr = 'INSERT INTO reservations ' + 
  	'(guest_id, booked_dates_id, total_adults, total_children, total_infants, total_charge) VALUES (?)';
  db.query(queryStr, [[data.guestId, data.bookedDatesId, data.adults, data.children, data.infants, data.total]], callback);
};

const deleteBookedDatesById = (id, callback) => {
  let queryStr = 'DELETE FROM booked_dates WHERE id = ?';
  db.query(queryStr, id, callback);
}


module.exports = {
	getListingById,
	getBookedDatesByListingId,
	postNewBookedDates,
	postNewReservation,
	deleteBookedDatesById
}

