const db = require('../db/index');
const bcrypt = require("bcrypt-nodejs");
const Promise = require("bluebird");
const jwt = require ('jwt-simple');
const config = require('../db/config');

exports.signin = function(req, res, next) {
  //User has already had their email and password authorized
  //Give them token
  let user = req.user;
  const token = tokenForUser(req.user);
  db.User.update({test: token}, {where: {id: user.id}});
  res.send({ token: token, user: {id: user.id, username: user.username, email:user.email, country: user.country, state: user.state, type: user.type, frozen: user.frozen, picture: user.picture} });
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const state = req.body.state;
  const country = req.body.country;
  const type = req.body.type;

  if(!email || !password) {
    return res.status(422).send({error: 'Provide email AND password'})
  }

  db.User.find({where:{email: email}})
    .then(email=>{
      if(email) {return res.status(422).send({error: "Email in use"})}
    }).catch(err=>{return next(err);})

  hashPassword(req.body.password)
    .then(hashed=>{
      req.body.password = hashed;
      db.User.create({
        email: email,
        password: req.body.password,
        username: username,
        country: country,
        state: state,
        type: type,
        test: "",
        frozen: 0,
        picture: "dummyPicture.awesome"

      })
        .then(function(user){
          const token = tokenForUser(user);
          db.User.update({test: token}, {where: {id: user.id}});
          res.json({token: token, user: {id: user.id, username: user.username, email:user.email, country: user.country, state: user.state, type: user.type, picture: user.picture, frozen: user.frozen}
        })
          })
          .catch(function(err) {
            return next(err);
          })
    })
}


//Helper Functions===
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.email, iat: timestamp }, config.secret);
}

function hashPassword (password) {
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, (error, salt)=>{
          if(error){reject(error)}
          bcrypt.hash(password, salt, null, (err, hash)=>{
            if(err){reject(err)}
            resolve(hash);
          })
        })
      })
    }