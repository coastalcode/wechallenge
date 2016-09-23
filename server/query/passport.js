const passport = require('passport');
const db = require('../db/index');
const config = require('../db/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //verify this emailand passwor,d call done with the user
  //if it is the correct email and password
  //otherwise, call doen with false
  db.User.findOne({ where:{ email:email} }).then(user=>{
    if(!user) { return done(null, false)};
    user.comparePassword(password, function(err, isMatch) {
      if (err) {return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  }).catch(err=>{return done(err)})
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  db.User.findOne({where:{email:payload.sub}})
    .then(user=>{
      if(user) { done(null, user) }
      else { done(null, false) }
    })
      .catch(err=>{
        return console.log(err);
    })
})

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);