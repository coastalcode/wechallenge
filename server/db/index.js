'use strict';

const Sequelize = require('sequelize');
const config = require('./config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
let db;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  // change username and password (or export)
  db = new Sequelize('wechallenge', config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
}

// User Type determines users permissions
// Each level of user accounts increase permissions
// Basic User
  // type = 1
  // permissions:
    // submit videos
    // vote on videos
    // comment on videos
    // flagged videos that are not an official record
// Power User
  // type = 2
  // permissions:
    // edit existing videos
    // view flagged videos and can remove them from the site
// Staff user
  // type = 3
  // permissions:
    // can set user levels of other users
const User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  picture: Sequelize.STRING,
  email: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING,
  type: Sequelize.STRING,
  test: Sequelize.STRING,
  frozen: Sequelize.INTEGER
},
{
  instanceMethods: {
    comparePassword: function (attemptedPassword, callback) {
      bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
        if (err) { throw err; }
        callback(null, isMatch);
      });
    }
  }
});

const Submission = db.define('Submission', {
  title: Sequelize.STRING,
  link: Sequelize.STRING,
  description: Sequelize.STRING,
  measurement: Sequelize.INTEGER,
  votes: Sequelize.INTEGER,
  official: Sequelize.INTEGER,
  measurement: Sequelize.INTEGER,
  public: Sequelize.INTEGER,
  state: Sequelize.STRING

});

const Comment = db.define('Comment', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  pinned: Sequelize.INTEGER,
});

const Vote = db.define('Vote', {
  voted: Sequelize.INTEGER,
});

const Record = db.define('Record', {
  category: Sequelize.STRING,
  subcategory: Sequelize.STRING,
  title: Sequelize.STRING,
  units: Sequelize.STRING,
  moreisgood: Sequelize.INTEGER,
  lessisgood: Sequelize.INTEGER
});

const Community = db.define('Community', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  picture: Sequelize.STRING
})

const CommunityComment = db.define('CommunityComment', {
  title: Sequelize.STRING,
  description: Sequelize.STRING
})

const UsersCommunitiesJoin = db.define('UsersCommunitiesJoin', {
})

const CommunityBulletin = db.define('CommunityBulletin', {
  subject: Sequelize.STRING,
  message: Sequelize.STRING,
  pinned: Sequelize.INTEGER
})

// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
Submission.belongsTo(User);
Submission.belongsTo(Record);

Comment.belongsTo(User);
Comment.belongsTo(Submission);

Vote.belongsTo(User);
Vote.belongsTo(Submission)

// enables bi-directional associations between Users and Messages
User.hasMany(Submission);
User.hasMany(Comment);
User.hasMany(Vote);

Submission.hasMany(Comment);
Submission.hasMany(Vote);

Record.hasMany(Submission);

///

CommunityComment.belongsTo(User);
CommunityComment.belongsTo(Submission);
CommunityComment.belongsTo(Community);

Submission.belongsTo(Community);

CommunityBulletin.belongsTo(User);
CommunityBulletin.belongsTo(Community);

UsersCommunitiesJoin.belongsTo(User);
UsersCommunitiesJoin.belongsTo(Community);

User.hasMany(CommunityComment)
User.hasMany(CommunityBulletin)
User.hasMany(UsersCommunitiesJoin)

Submission.hasMany(CommunityComment)

Community.hasMany(CommunityComment)
Community.hasMany(Submission)
Community.hasMany(CommunityBulletin)
Community.hasMany(UsersCommunitiesJoin)

User.sync(/*{force: true}*/);
Submission.sync(/*{force: true}*/);
Comment.sync(/*{force: true}*/);
Vote.sync(/*{force: true}*/);
Record.sync(/*{force: true}*/);
// turn on "force:true" to drop any existing table and replace with new one (ie: drop "User" table, create new "User" table)

db.Sequelize = Sequelize;
module.exports = db;

module.exports.User = User;
module.exports.Submission = Submission;
module.exports.Comment = Comment;
module.exports.Vote = Vote;
module.exports.Record = Record;
