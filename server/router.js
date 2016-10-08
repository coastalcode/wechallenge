'use strict';

const db = require('./db/index');
const Authentication = require('./query/auth');
const passportService = require('./query/passport');
const passport = require('passport');
const query = require('./query')
// const bodyParser = require('body-parser');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function (app) {
  ///
  //testing purposes: will be removed
  app.get('/test', requireAuth, function(req, res) {
    res.send({message: 'authenticated message'})
  })

  ///

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)

  ///
  app.get('/users', query.user.findAll);
  app.get('/usersub/:id', query.user.findUserSubs);
  app.post('/users', query.user.add);

  app.get('/users/:id', query.user.findOne);
  app.put('/users/:id', query.user.update);
  app.delete('/users/:id', query.user.delete);

  ///



  app.get('/submissions', query.submission.findAll);
  app.post('/submissions', query.submission.add);
  app.post('/submissions/challenge', query.submission.addChallenge);
  app.get('/submissions/adminremove/:id', query.submission.adminRemove);

  app.get('/submissions/flag/:id', query.submission.toggleOfficial);

  app.get('/submissions/flagged', query.submission.findAllFlagged);

  app.get('/submissions/community', query.submission.findACommunity);
  app.get('/submissions/:id', query.submission.findAllPublic);


  app.post('/submissions/upvote/:id', query.submission.upvote);
  app.post('/submissions/downvote/:id', query.submission.downvote);
  app.put('/submissions/:id', query.submission.update);
  app.delete('/submissions/:id', query.submission.delete);

  ///

  app.get('/comments', query.comment.findAll);
  app.post('/comments', query.comment.add);

  app.get('/comments/:submissionid', query.comment.findAllWhere);

  app.get('/comments/user/:userid', query.comment.findByUser)
  app.put('/comments/pin/:id', query.comment.togglePin);

  app.put('/comments/:id', query.comment.update);
  app.delete('/comments/:id', query.comment.delete);

  ///

  app.get('/votes/all', query.vote.findAll);
  app.post('/votes', query.vote.add);
  app.put('/votes', query.vote.toggleVote)
  app.get('/votes/:id', query.vote.findOne);

  ///

  app.get('/records', query.record.findAll);
  app.post('/records', query.record.add);

  app.get('/records/:id', query.record.findOne);
  app.put('/records/:id', query.record.update);
  app.delete('/records/:id', query.record.delete);

  ///

  app.get('/communities/submissions/:id', query.submission.findOneCommunity)
  app.get('/communities/comments', query.communityComments.findForOne)
  app.post('/communities/comments', query.communityComments.add)

  app.get('/communitiesall', query.community.findAll);
  app.post('/communities', query.community.createAndJoinCommunity)
  app.post('/communities/join', query.community.addMembership)
  // there is an issue here**
  app.get('/communities/:userid', query.community.findAllCommunities)
  app.get('/community/:id', query.community.findCommunity)


  ///
  app.get('/bulletins/:id', query.communityBulletins.findForOne);
  app.put('/bulletins/pin/:id', query.communityBulletins.togglePin);
  app.post('/bulletins', query.communityBulletins.add);

  // only for easy testing purposes. will be removed
  app.get('/addusers/:state', query.user.testAdd);
  app.get('/testaddcomments', query.comment.testAdd);
  app.get('/testaddsubmission', query.submission.testAdd);

  app.post('/images', query.image.add);
  app.get('/images/:id', query.image.get);
}