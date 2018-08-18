// Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// App
const app = express();
const PORT = process.env.PORT || 3100;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './server/views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Use Routes
app.use(routes);

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
