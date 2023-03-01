const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (_req, res) => {
	res.json(db.seats);
});

router.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const seat = db.seats.find((item) => item.id === id);
	if (seat) {
		res.json(seat);
	} else {
		next();
	}
});

router.post('/', (req, res) => {
	const { day, seat, client, email } = req.body;
	const id = uuid();
	const newSeat = { id: id, day: day, seat: seat, client: client, email: email };
	db.seats.push(newSeat);
	res.json({ message: 'OK' });
});


router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const seatIndex = db.seats.find((item) => item.id === id);
	db.seats.splice(seatIndex, 1);
	res.json({ message: 'OK' });
});

router.put('/:id', (req, res,) => {
	const { day, seat, client, email } = req.body;
	const id = req.params.id;
	const seats = db.seats.find(item => item.id == id);
	seat.day = day;
	seat.seat = seat;
	seat.client = client;
	seat.email = email;
	res.json({ message: 'OK' });
},
	(err) => {
		console.log(err);
	}
);

module.exports = router;