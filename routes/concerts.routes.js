const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid').v4;

router.get('/concerts', (_req, res) => {
	res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
	res.json(db.concerts.find((data) => data.id == req.params.id));
});

router.post('/concerts', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = uuid();
	const newConcert = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
	db.concerts.push(newConcert);
	res.json({ message: 'OK' });
});

router.delete('/concerts/:id', (_req, res) => {
	const concertIndex = db.concerts.findIndex((data) => data.id === id);
	db.concerts.splice(concertIndex, 1);
	res.json({ message: 'Deleted!' });
});

router.put('/concerts/:id', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = +req.params.id;
	const concerts = db.concerts.find((data) => data.id === id);
	const elem = db.concerts.indexOf(concerts);
	const newConcerts = {
		id: id,
		performer: performer,
		genre: genre,
		price: price,
		day: day,
		image:image,
	};
	db.concerts[elem] = newConcerts
	res.json({ message: 'OK' });
},
);

module.exports = router;