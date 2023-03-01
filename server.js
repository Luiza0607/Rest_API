const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
	{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
	{ id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

//Testimonials

app.get('/testimonials', (_req, res) => {
	res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const testimonial = db.testimonials.find(item => item.id == id);
	if (testimonial) {
		res.json(testimonial);
	} else {
		next();
	}
});

app.get('/testimonials/random', (_req, res) => {
	const id = Math.floor(Math.random() * db.length);
	const randomTestimonialElem = db.testimonials[id];
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
	const testimonial = db.testimonials.find(item => item.id == id);
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
	const testimonialIndex = db.testimonials.find((item) => item.id === id);
	db.splice(testimonialIndex, 1);
	res.json({ message: 'OK' });
});


// Concerts

app.get('/concerts', (_req, res) => {
	res.json(db.concerts);
});

app.get('/concerts/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const concert = db.concerts.find(item => item.id == id);
	if (concert) {
		res.json(concert);
	} else {
		next();
	}
});

app.post('/concerts', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = uuid();
	const newConcert = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
	db.concerts.push(newConcert);
	res.json(newConcert);
});

app.delete('/concerts/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const concertIndex = db.concerts.find((item) => item.id === id);
	db.concerts.splice(concertIndex, 1);
	res.json(concertIndex);
});

app.put('/concerts/:id', (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const id = +req.params.id;
	const concert = db.concerts.find(item => item.id == id);
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


//Seats

app.get('/seats', (_req, res) => {
	res.json(db.seats);
});

router.get('/seats/:id', (req, res, next) => {
	const id = parseInt(req.params.id);
	const seat = db.seats.find((item) => item.id === id);
	if (seat) {
		res.json(seat);
	} else {
		next();
	}
});

app.post('/seats', (req, res) => {
	const { day, seat, client, email } = req.body;
	const id = uuid();
	const newSeat = { id: id, day: day, seat: seat, client: client, email: email };
	db.seats.push(newSeat);
	res.json(newSeat);
});


app.delete('/seats/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const seatIndex = db.seats.find((item) => item.id === id);
	db.seats.splice(seatIndex, 1);
	res.json(seatIndex);
});

app.put('/seats/:id', (req, res) => {
	const { day, seat, client, email } = req.body;
	const id = +req.params.id;
	const seats = db.seats.find(item => item.id == id);
	seat.day = day;
	seat.seat = seat;
	seat.client = client;
	seat.email = email;
	res.json(seats);
},
	(err) => {
		console.log(err);
	}
);

app.use((_req, res) => {
	res.status(404).send('Not found');
})

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});