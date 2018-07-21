const db = require('./db.config.js');


db.connect((err, response) => {
  if (err) console.log(err);
  else console.log(`SUCCESS : ${response}`);
});
