const db = require('../db/index.js');
const app = express ();

app.use(express.static('../public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(3003, ()=> console.log('Listening at localhost:3003'));

app.get('/api/listings/:listingId', (req, res) => {
	db.getListingById(req.params.listingId, (err, result) => {
		if (err) {
			res.status(500).send({err: "Something blew up!"});
		} else if (result.length === 0){
			res.status(404).send("No such listing!");
		} else res.send(result);
	});
});

app.post('/api/reservations/new', (req, res) => {
	var data = {};
	data.listingId = req.body.listingId;
	data.checkIn = new Date(...req.body.checkIn);
	data.checkOut = new Date(...req.body.checkOut);
	db.postNewBookedDates(data, (err, result) => {
		if (err) {
			res.status(500).send({err: "Failed to post dates"});

		}else {
			req.body.bookedDatesId = result.insertId;
			db.postNewReservation(req.body, (err, reservation) => {
				if (err) {
					console.log(err)
					db.deleteBookedDatesById(result.insertId, (err, result) => {
						res.status(500).send({err:"Failed to post reservation"});
					});
				} else res.status(201).send(reservation);
			});
		}
	});
});

