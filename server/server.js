require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const crypto = require('crypto');
const cache = require('memory-cache');

const app = express();

// Middleware
app.use(cors());

// caching
let marvelCache = new cache.Cache();
    let cacheMiddleware = (duration) => {
        return (req, res, next) => {
            let key =  '__express__' + req.originalUrl || req.url
            let cacheContent = marvelCache.get(key);
            if(cacheContent){
                res.send( cacheContent );
                return
            }else{
                res.sendResponse = res.send
                res.send = (body) => {
                    marvelCache.put(key,body,duration*1000);
                    res.sendResponse(body)
                }
                next()
            }
        }
    }

// Proxy
const { PUBLIC_KEY, PRIVATE_KEY } = process.env
const ts = Date.now()
const data = `${ts}${PRIVATE_KEY}${PUBLIC_KEY}`
const hash = crypto.createHash('md5').update(data).digest('hex')
const url = 'http://gateway.marvel.com/v1/public/characters'
app.get('/',cacheMiddleware(30), (req, res) => {
  fetch(`${url}?limit=100&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => response.json())
    .then(json => {
      res.json(json.data.results);
    })
    .catch(e => {
      res.status(500)
        .json({ error: true })
    })
});

// Error handler
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
