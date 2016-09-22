const Sequelize = require('sequelize');
const config = require('./config.js')
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

const User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING,
  type: Sequelize.STRING,
});

const Submission = db.define('Submission', {
  title: Sequelize.STRING,
  link: Sequelize.STRING,
  description: Sequelize.STRING,
  votes: Sequelize.INTEGER,
  official: Sequelize.STRING,
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
  measurement: Sequelize.INTEGER,
  units: Sequelize.STRING,
  moreisgood: Sequelize.INTEGER,
  lessisgood: Sequelize.INTEGER,
});
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

User.sync(/*{force: true}*/);
Submission.sync(/*{force: true}*/);
Comment.sync(/*{force: true}*/);
Vote.sync(/*{force: true}*/);
Record.sync(/*{force: true}*/);
// turn on "force:true" to drop any existing table and replace with new one (ie: drop "User" table, create new "User" table)

db.Sequelize = Sequelize;
module.exports = db;

exports.User = User;
exports.Submission = Submission;
exports.Comment = Comment;
exports.Vote = Vote;
exports.Record = Record;
