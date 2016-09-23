const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');
const db = require('./db')
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));//parse request to json

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

// sync the database before starting the server, unless there is an error
db.sync({force: true})
    .then(startApp)
    .catch(function (err) {
        throw new Error(err);
    });


