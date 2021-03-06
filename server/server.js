'use strict';

const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router.js');
const db = require('./db')
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}, {limit: '50mb'}));
app.use(bodyParser.json({length: '1000000'}))
app.use(express.static(path.join(__dirname, './../client/dist')))

router(app);

const port = process.env.PORT || 3000;
app.set('port', port);

function startApp() {
  app.listen(app.get('port'), function(err) {
    if (err) {
      console.log("Error!", err)
    } else {
      console.log("Server running on port", port)
    }
  });

}

//Load index.html and allow react-router to do the magic
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// sync the database before starting the server, unless there is an error
db.sync()
    .then(startApp)
    .catch(function (err) {
        throw new Error(err);
    });

