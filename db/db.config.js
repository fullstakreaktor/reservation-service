const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'http://127.0.0.1:3003',
	user: 'FILL_ME_IN',
	password: 'FILL_ME_IN',
	database: 'airpnp'
});

module.exports = {
	db,
};