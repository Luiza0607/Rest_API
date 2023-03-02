const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/testimonials', (_req, res) => {
	res.json(db.testimonials);
});

router.get('/testimonials/:id', (req, res) => {
	res.json(db.testimonials.find((data) => data.id == req.params.id));
});

router.get('/testimonials/random', (_req, res) => {
	const id = Math.floor(Math.random() * db.testimonials.length);
	const randomTestimonialElem = db.testimonials[id];
	res.json(randomTestimonialElem);
});

router.post('/testimonials', (req, res) => {
	const { author, text } = req.body;
	const id = uuidv4();
	const newTestimonial = { id: id, author: author, text: text };
	db.testimonials.push(newTestimonial);
	res.json({ message: 'OK' });
});

router.put('/testimonials/:id', (req, res) => {
	const { author, text } = req.body;
	const id = +req.params.id;
	const testimonial = db.testimonials.find((testimonial) => testimonial.id === id);
	testimonial.author = author;
	testimonial.text = text;
		res.json({ message: 'OK' });
},
	(err) => {
		console.log(err);
	}
);

router.delete('/testimonial/:id', (req, res) => {
	const id = +req.params.id;
	const testimonialIndex = db.testimonials.findIndex((testimonial) => testimonial.id === id);
	db.testimonials.splice(testimonialIndex, 1);
	res.json({ message: 'Deleted!' });
});

module.exports = router;