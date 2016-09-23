const db = require('./db/index');
const Authentication = require('./query/auth');
const passportService = require('./query/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false})
module.exports = function (app) {
  //test router for passport token authentication
  app.get('/test', requireAuth, function(req, res) {
    res.send({message: 'authenticated message'})
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)

  app.all('/*', (req, res)=>{
  res.sendFile('index.html', {
    root: path.resolve(__dirname, './../client/dist')
  });
})
}