const express = require('express');
const connectionDb = require('./dbconnect.js').connectionDb;
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json())
app.use(express.static('client/dist'));

// Routes methods
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

headers['Content-Type'] = 'application/json';

app.get('/api/movies', (request, response) => {
  console.log('get method called');
  // let movies = [
  //   {title: 'Iron Man', watch: 'To watch', year: '2008', runtime: '126min',
  //   rating: 7.9, picture: 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/c0/639a7b035cbaa/clean.jpg'},
  //   {title: 'Captain America: The First Avenger', watch: 'Watched', year: '2011', runtime: '124min',
  //   rating: 6.9, picture: 'https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_.jpg'},
  // ];
  connectionDb.promise().query('SELECT title, watch, year, runtime, rating, picture FROM movies')
  .then(([rows, fields]) => {
    response.set(headers);
    response.status(200).json(rows);
  })
  .catch(() => {console.log('error when GET')})
})

app.post('/api/movies', (request, response) => {
  console.log('post method called');
  let movie = request.body;
  // let movie = {title: 'Iron Man', watch: 'To watch', year: '2008', runtime: '126min',
  // rating: 7.9, picture: 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/c0/639a7b035cbaa/clean.jpg'};

  connectionDb.promise().query('SELECT * FROM movies WHERE title = ?', movie.title)
  .then(function([rows, fields]) {
    if (rows.length === 0) {
      connectionDb.promise().query('INSERT INTO movies SET ?', movie)
      .then(() => {
        response.set(headers);
        response.status(201).end();
      })
      .catch(() => {console.log('error when insert')});
    } else {
      connectionDb.promise().query('UPDATE movies SET watch = ? WHERE title = ?', [movie.watch, movie.title])
      .then(() => {
        response.set(headers);
        response.status(201).end();
      })
      .catch(() => {console.log('error when update')});
    }
  })
})

app.all('*', (req, res, next) => {
  res.json('Hello World');
  next() // pass control to the next handler
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})