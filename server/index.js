require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const crypto = require('crypto')


// ##CREATE APP INSTANCE
const app = express();

// ##MIDDLEWARE
app.use(cors());


// ##ROUTE
const { PUBLIC_KEY, PRIVATE_KEY } = process.env
const ts = Date.now()
const data = `${ts}${PRIVATE_KEY}${PUBLIC_KEY}`
const hash = crypto.createHash('md5').update(data).digest('hex')
const url = 'http://gateway.marvel.com/v1/public/characters'
app.get('/', (req, res) => {
  fetch(`${url}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => response.json())
    .then(json => {
      res.json(json);
      console.log(json);
    });
});


// ##ERROR HANDLER
app.use((req, res, err) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: 'There is an error'
    }
  });
});


// local and production port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is live on port ${port}`));
