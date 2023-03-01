const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (_req, res) => {
	res.json(db.testimonials);
});

router.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const testimonial = db.testimonials.find(item => item.id == id);
	if (testimonial) {
		res.json(testimonial);
	} else {
		next();
	}
});

router.get('/random', (_req, res) => {
	const id = Math.floor(Math.random() * db.testimonials.length);
	const randomTestimonialElem = db.testimonials[id];
	res.json(randomTestimonialElem);
});

router.post('/', (req, res) => {
	const { author, text } = req.body;
	const id = uuidv4();
	const newTestimonial = { id: id, author: author, text: text };
	db.testimonials.push(newTestimonial);
	res.json({ message: 'ok!' });
});

router.put('/:id', (req, res, next) => {
	const { newAuthor, newText } = req.body;
	const id = parseInt(req.params.id);
	const testimonialItem = db.testimonials.findIndex(item => item.id == id);
	if (testimonial !== -1) {
		db.testimonials[testimonialItem].author = newAuthor;
		db.testimonials[testimonialItem].text = newText;
		res.json({ message: 'ok!' });
	} else {
		next();
	}
});

router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const testimonialIndex = db.testimonials.findIndex((item) => item.id === id);
	db.testimonials.splice(testimonialIndex, 1);
	res.json({ message: 'OK' });
});

module.exports = router;

