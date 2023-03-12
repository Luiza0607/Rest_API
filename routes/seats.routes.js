const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid').v4;

router.get('/seats', (_req, res) => {
	res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
	res.json(db.seats.find((seat) => seat.id == req.params.id));
});

router.post('/seats', (req, res) => {
	const { day, seat, client, email } = req.body;
	const id = uuid();
	const newSeat = { id: id, day: day, seat: seat, client: client, email: email };
	if (db.seats.some(seat => seat.day === newSeat.day && seat.seat === newSeat.seat)) {
		res.status(409).json({ message: 'Slot is already occupied...' });
	} else {
		db.seats.push(newSeat);
		req.io.emit('seatsUpdated', db.seats);
		res.status(201).json({ message: 'OK' });
	}
});

router.delete('/seats/:id', (req, res) => {
	const id = +req.params.id;
	const seatIndex = db.seats.find((seat) => seat.id === id);
	db.seats.splice(seatIndex, 1);
	res.json({ message: 'Deleted!' });
});

router.put('/seats/:id', (req, res,) => {
	const { day, seat, client, email } = req.body;
	const id = +req.params.id;
	const seats = db.seats.find((seat) => seat.id == id);
	seats.day = day;
	seats.seat = seat;
	seats.client = client;
	seats.email = email;
	res.json({ message: 'OK' });
},
	(err) => {
		console.log(err);
	}
);

module.exports = router;