const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (_req, res) => {
	res.json(db.concerts);
});

router.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const concert = db.concerts.find((item) => item.id == id);
	if (concert) {
		res.json(concert);
	} else {
		next();
	}
});

router.post('/', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = uuid();
	const newConcert = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
	db.concerts.push(newConcert);
	res.json(newConcert);
});

router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const concertIndex = db.concerts.find((item) => item.id === id);
	db.concerts.splice(concertIndex, 1);
	res.json({ message: 'Deleted!' });
});

router.put('/:id', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = req.params.id;
	const concert = db.concerts.find((item) => item.id == id);
	concert.performer = performer;
	concert.genre = genre;
	concert.price = price;
	concert.day = day;
	concert.image = image;
	res.json(concert);  
},
	(err) => {
		console.log(err);
	}
);

module.exports = router;
