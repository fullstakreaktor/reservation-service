const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || 'localhost',
  user: process.env.RDS_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || '',
  port: process.env.RDS_PORT|| 3306,
  database: 'reservation'
});


const getListingById = ({listingId}, callback) => {
  const queryStr = `SELECT * from listings WHERE id = ? `;
  db.query(queryStr, listingId, callback);
};

const getReviewsByListingId = (listingId, callback) => {
  const queryStr = `SELECT * from reviews WHERE id = ?`;
  db.query(queryStr, listingId, callback);
};

const getBookedDatesByListingId = ([listingId, year, month], callback) => {
  let startDate = [year, month, 1].join('-');
  let endDate = month === 12? [Number(year)+1, 1, 1].join('-'): [year, Number(month)+1, 1].join('-');

  const queryStr = `SELECT check_in, check_out FROM booked_dates WHERE listing_id = ? AND check_in >= ? AND check_in < ? ORDER BY check_in`;
  db.query(queryStr, [listingId, startDate, endDate], callback);
};

const getFirstBookedDateAfterTarget = ([listingId, year, month, date], callback) => {
  let startDate = [year, month, date].join('-');
  let endDate = month === 12? [Number(year)+1, 1, 1].join('-'): [year, Number(month)+1, 1].join('-');

  const queryStr = `SELECT check_in FROM booked_dates WHERE listing_id = ? AND check_in > ? AND check_in < ? ORDER BY check_in ASC LIMIT 1`;
  db.query(queryStr, [listingId, startDate, endDate], callback)
}

const postNewBookedDates = (data, callback) => {
  const queryStr = `INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES (?)`;
  db.query(queryStr, [data.listingId, data.checkIn, data.checkOut], callback);
}

const postNewReservation = ({guestId, bookedDatesId, guests, total}, callback) => {
  const queryStr = `INSERT INTO reservations `
    + `(guest_id, booked_dates_id, total_adults, total_children, total_infants, total_charge) VALUES (?)`;
  const values = [guestId, bookedDatesId, guests.adults, guests.children, guests.total, total];
  db.query(queryStr, [values], callback);
};

const deleteBookedDatesById = ({listingId}, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = ?`;
  db.query(queryStr, listingId, callback);
};


module.exports = {
  getListingById,
  getReviewsByListingId,
  getBookedDatesByListingId,
  getFirstBookedDateAfterTarget,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
};
