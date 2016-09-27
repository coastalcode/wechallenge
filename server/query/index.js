const db = require('../db/index.js')

// [tablename].findAll = select * from table (ex: user.findAll)
// [tablename].add = insert into table

module.exports = {
  user: {
    findAll(req, res) {
      db.User.findAll()
      .then(users => res.json(users))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        state: req.body.state,
        country: req.body.country,
        type: req.body.type
      })
      .then(user => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.User.findOne({ where: { id: req.params.id } })
        .then(user => res.json(user))
        .catch(error => console.error(error))
    },

    update(req, res) {
      db.User.findOne({ where : { id: req.params.id } })
        .then(user => {
          let username = req.body.username || user.username;
          let password = req.body.password || user.password;
          let email = req.body.email || user.email;
          let state = req.body.state  || user.state;
          let country = req.body.country || user.country;
          let type = req.body.type || user.type;
          db.User.update({
            username, password, email, state, country, type
          } , { where : { id: req.params.id } })
            .then(user => res.json(user))
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },

    delete(req, res) {
      db.Submission.destroy({ where: { UserId: req.params.id } });
      db.Comment.destroy({ where: { UserId: req.params.id } });
      db.Vote.destroy({ where: { UserId: req.params.id } });
      db.User.destroy({ where: { id: req.params.id } })
        .then(user => res.json(user))
        .catch(error => console.error(error))
    },

    // this function is used for quick testing. will be removed.
    testAdd(req, res) {
      db.User.create({
        username: "testUser",
        password: "testPassword",
        email: "test@test.com",
        state: req.params.state,
        country: "USA",
        type: "reg"
      })
      .then(user => res.sendStatus(201))
      .catch(error => console.error(error))
    }

  },

  ////
  submission: {
    findAll(req, res) {
      db.Submission.findAll()
      .then(submissions => res.json(submissions))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.Record.findOrCreate({
        where: {
          category: req.body.selectedCategory,
          subcategory: req.body.selectedSubCategory,
          title: req.body.title
        },
        defaults: {
          category: req.body.selectedCategory,
          subcategory: req.body.selectedSubCategory,
          title: req.body.title,
          measurement: req.body.measurement,
          units: req.body.units,
          moreisgood: req.body.moreisgood,
          lessisgood: req.body.lessisgood
        }
    }).spread(function(record) {
      console.log('record-------', record);
    })

      // db.Submission.create({
      //   title: req.body.title,
      //   link: req.body.link,
      //   description: req.body.description,
      //   votes: 0,
      //   official: 1,
      //   UserId: req.body.userId,
      //   RecordId: req.body.recordId
      // })
      // .then(submission => res.sendStatus(201))
      // .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.Submission.findOne({ where: { id: req.params.id } })
        .then(submission => res.json(submission))
        .catch(error => console.error(error))
    },

    update(req, res) {
      db.Submission.findOne({ where : { id: req.params.id } })
        .then(submission => {
          let title = req.body.title || submission.title;
          let link = req.body.link || submission.link;
          let description = req.body.description || submission.description;
          db.Submission.update({
            title, link, description
          } , { where : { id: req.params.id } })
            .then(submission => res.json(submission))
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },

    upvote(req, res) {
      db.Submission.findOne({ where : { id: req.params.id } })
        .then(submission => {
          let vote = submission.vote;
          vote++;
          db.Submission.update({
            vote
          } , { where : { id: req.params.id } })
            .then(submission => res.json(submission))
            .catch(error => console.error(error))
        })
    },

    downvote(req, res) {
      db.Submission.findOne({ where : { id: req.params.id } })
        .then(submission => {
          let vote = submission.vote;
          vote--;
          db.Submission.update({
            vote
          } , { where : { id: req.params.id } })
            .then(submission => res.json(submission))
            .catch(error => console.error(error))
        })
    },

    delete(req, res) {
      db.Comment.destroy({ where: { SubmissionId: req.params.id } });
      db.Vote.destroy({ where: { SubmissionId: req.params.id } });
      db.Submission.destroy({ where: { id: req.params.id } })
        .then(submission => res.json(submission))
        .catch(error => console.error(error))
    }

  },

  ////
  comment: {
    findAll(req, res) {
      db.Comment.findAll()
      .then(comments => res.json(comments))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.Comment.create({
        title: req.body.title,
        description: req.body.description,
        pinned: 0,
        UserId: req.body.userId,
        SubmissionId: req.body.submissionId
      })
      .then(comment => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.Comment.findOne({ where: { id: req.params.id } })
        .then(comment => res.json(comment))
        .catch(error => console.error(error))
    },

    update(req, res) {
      db.Comment.findOne({ where : { id: req.params.id } })
        .then(comment => {
          let title = req.body.title || comment.title;
          let description = req.body.description || comment.description;
          db.Comment.update({
            title, description
          } , { where : { id: req.params.id } })
            .then(comment => res.json(comment))
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },

    delete(req, res) {
      db.Comment.destroy({ where: { id: req.params.id } })
        .then(comment => res.json(comment))
        .catch(error => console.error(error))
    },

    togglePin(req, res) {
      db.Comment.findOne({ where : { id: req.params.id } })
        .then(comment => {
          let pinned;
          if (comment.pinned === 0) {
            pinned = 1;
          } else {
            pinned = 0;
          }
          db.Comment.update({ pinned } , { where : { id: req.params.id } })
            .then(comment => res.json(comment))
            .catch(error => console.error(error))
        })
    },

    // used for quick testing. will be removed
    testAdd(req, res) {
      db.Comment.create({
        title: "testCommentTitle",
        description: "testCommentDescription",
        pinned: 0
      })
      .then(comment => res.sendStatus(201))
      .catch(error => console.error(error))
    }

  },

  ////
  vote: {
    findAll(req, res) {
      db.Vote.findAll()
      .then(votes => res.json(votes))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.Vote.create({
        voted: 1,
        UserId: req.body.userId,
        SubmissionId: req.body.submissionId
      })
      .then(vote => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
    // this needs to be written
    }

  },

  ////
  record: {
    findAll(req, res) {
      db.Record.findAll()
      .then(records => res.json(records))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.Record.create({
        category: req.body.category,
        subcategory: req.body.subcategory,
        title: req.body.title,
        measurement: req.body.measurement,
        units: req.body.units,
        moreisgood: req.body.moreisgood || 1,
        lessisgood: req.body.lessisgood || 0,
      })
      .then(record => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.Record.findOne({ where: { id: req.params.id } })
        .then(record => res.json(record))
        .catch(error => console.error(error))
    },

    update(req, res) {
      db.Record.findOne({ where : { id: req.params.id } })
        .then(record => {
          let category = req.body.category || record.category;
          let subcategory = req.body.subcategory || record.subcategory;
          let title = req.body.title || record.title;
          db.Record.update({
            category, subcategory, title
          } , { where : { id: req.params.id } })
            .then(record => res.json(record))
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },

    delete(req, res) {
      db.Submission.destroy({ where: { RecordId: req.params.id } })
        .catch(error => console.error(error))
      db.Record.destroy({ where: { id: req.params.id } })
        .then(record => res.json(record))
        .catch(error => console.error(error))
    }

  }

}