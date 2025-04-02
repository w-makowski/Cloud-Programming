// for serverless only:
// const serverless = require('serverless-http');

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8080;
// Plik JSON do przechowywania wpisów
const guestbookFile = path.join(__dirname, 'data', 'guestbook.json');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ustawienie silnika szablonów EJS
app.set('view engine', 'ejs');

// for serverless only:
// app.set('views', path.join(__dirname, 'views'));

// Middleware do przekazywania aktualnej ścieżki do szablonów
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Główna trasa
app.get('/', (req, res) => {
    res.render('layout', 
        { title: 'Strona główna', 
            body: 'index',
            path: req.path,
            message: 'Welcome!' 
        });
});

app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.get('/about', (req, res) => {
    res.render('layout', { 
        title: 'O mnie - Jan Kowalski',
        body: 'about',
        path: req.path
    });
});

app.get('/services', (req, res) => {
    res.render('layout', { 
        title: 'Oferta - Jan Kowalski',
        body: 'services',
        path: req.path
    });
});
  
app.get('/gallery', (req, res) => {
    res.render('layout', { 
        title: 'Galeria - Jan Kowalski',
        body: 'gallery',
        path: req.path
    });
});

app.get('/guestbook', (req, res) => {
    fs.readFile(guestbookFile, (err, data) => {
        const entries = err ? [] : JSON.parse(data);
        res.render('layout', { 
            title: 'Księga gości - Jan Kowalski', 
            body: 'guestbook',
            path: req.path, 
            entries 
        });
    });
});

app.get('/contact', (req, res) => {
    res.render('layout', { 
      title: 'Kontakt - Jan Kowalski',
      body: 'contact',
      path: req.path
    });
});

app.post('/submit-form', (req, res) => {
    console.log(req.body);
    res.send('Formularz został wysłany!');
});

// Obsługa dodawania wpisu
app.post('/submit-guestbook', (req, res) => {
    const { name, email, message, rating } = req.body;
    // console.log("Nowy wpis:", req.body);
    const newEntry = {
        name,
        email,
        message,
        rating: parseInt(rating),
        date: new Date().toLocaleDateString('pl-PL')
    };

    fs.readFile(guestbookFile, (err, data) => {
        const entries = err ? [] : JSON.parse(data);
        entries.unshift(newEntry);
        fs.writeFile(guestbookFile, JSON.stringify(entries, null, 2), () => {
            res.redirect('/guestbook');
        });
    });
});

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user');
});
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Not found!' });
});
app.use((req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { title: 'Server error!' });
});


// for serverless only:
// module.exports.handler = serverless(app);

// Start serwera
// comment those lines if you want to start it serverless:
app.listen(port, () => {
    console.log(`Aplikacja nasłuchuje na porcie ${port}`);
});

