const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
	{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
	{ id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (_req, res) => {
	res.json(db);
});

app.get('/testimonials/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const testimonial = db.find(testimonials => testimonials.id == id);
	if (testimonial) {
		res.json(testimonial);
	} else {
		next();
	}
});

app.get('/testimonials/random', (_req, res) => {
	const id = Math.floor(Math.random() * db.length);
	const randomTestimonialElem = db[id];
	res.json(randomTestimonialElem);
});

app.post('/testimontials', (req, res) => {
	const { author, text } = req.body;
	const id = uuidv4();
	const newTestimonial = { id: id, author: author, text: text };
	db.push(newTestimonial);
	res.json({ message: 'ok!' });
});

app.put('/testimontials/:id', (req, res) => {
	const { newAuthor, newText } = req.body;
	const id = +req.params.id;
	const testimonial = db.find(item => item.id == id);
	testimonial.author = newAuthor;
	testimonial.text = newText;
	res.json({ message: 'ok!' });
},
	(err) => {
		console.log(err);
	}
);

app.delete('/testimonials/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const testimonialIndex = db.find((item) => item.id === id);
	db.splice(testimonialIndex, 1);
	res.json({ message: 'OK' });
});

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});