'use strict';

const db = require('./db/index');
const Authentication = require('./query/auth');
const passportService = require('./query/passport');
const passport = require('passport');

const query = require('./query')
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


  app.get('/users', query.user.findAll);
  app.post('/users', query.user.add);

  app.get('/users/:id', query.user.findOne);
  app.put('/users/:id', query.user.update);
  app.delete('/users/:id', query.user.delete);

  ///

  app.get('/submissions', query.submission.findAll);
  app.post('/submissions', query.submission.add);

  app.get('/submissions/:id', query.submission.findOne);
  app.post('/submission/upvote/:id', query.submission.upvote);
  app.post('/submission/downvote/:id', query.submission.downvote);
  app.put('/submissions/:id', query.submission.update);
  app.delete('/submissions/:id', query.submission.delete);

  ///

  app.get('/comments', query.comment.findAll);
  app.post('/comments', query.comment.add);

  app.get('/comments/:id', query.comment.findOne);
  app.post('/comments/pin/:id', query.comment.togglePin);
  app.put('/comments/:id', query.comment.update);
  app.delete('/comments/:id', query.comment.delete);

  ///

  app.get('/votes', query.vote.findAll);
  app.post('/votes', query.vote.add);
  app.get('/votes/:id', query.vote.findOne);

  ///

  app.get('/records', query.record.findAll);
  app.post('/records', query.record.add);

  app.get('/records/:id', query.record.findOne);
  app.put('/records/:id', query.record.update);
  app.delete('/records/:id', query.record.delete);

  ///

  // only for easy testing purposes. will be removed
  app.get('/addusers/:state', query.user.testAdd);
  app.get('/testaddcomments', query.comment.testAdd);
}