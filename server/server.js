const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router.js');
const db = require('./db')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({type:'*/*'}));//parse request to json

// app.use(express.static(path.join(__dirname, '.././client')))
router(app);

// app.all('/*', (req, res)=>{
//   res.sendFile('index.html', {
//     root: path.resolve(__dirname, '.././client')
//   });
// })
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
db.sync()
    .then(startApp)
    .catch(function (err) {
        throw new Error(err);
    });


