const db = require('./db.config.js');
const tablePopulators = require('../mock-data/query_generator.js');

db.connect((err, response) => {
  if (err) console.log(err);
  else console.log(`SUCCESS : ${response}`);
});
