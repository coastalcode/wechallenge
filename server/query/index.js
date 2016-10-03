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
        picture: "",
        email: req.body.email,
        state: req.body.state,
        country: req.body.country,
        type: req.body.type,
        frozen: 0
      })
      .then(user => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.User.findOne({ where: { id: req.params.id } })
        .then(user => res.json(user))
        .catch(error => console.error(error))
    },

    findUserSubs(req, res) {
      console.log('SUBS', req.params.id)
      db.User.findAll({
        include: [{
          model: db.Submission, required: true
        }],
        where: {id: req.params.id}
      })
      .then(data => res.json(data))
      .catch(error => console.error(error))
    },

    update(req, res) {
      db.User.findOne({ where : { id: req.params.id } })
        .then(user => {
          let type = req.body.type || user.type;
          db.User.update({
            type
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
        .catch(err => console.error(err))
    },

    findOneRecord(req, res) {
      db.Submission.findAll({ where: { RecordId: req.params.recordid } })
        .then(submissions => res.json(submissions))
        .catch(err => console.error(err))
    },

    add(req, res) {
      db.Record.findOrCreate({
        where: {
          category: req.body.selectedCategory,
          subcategory: req.body.selectedSubCategory,
          title: req.body.title,
          units: req.body.units,
          moreisgood: req.body.moreisgood,
          lessisgood: req.body.lessisgood
        },
        defaults: {
          category: req.body.selectedCategory,
          subcategory: req.body.selectedSubCategory,
          title: req.body.title,
          units: req.body.units,
          moreisgood: req.body.moreisgood,
          lessisgood: req.body.lessisgood
        }
      }).then((record) => {
        console.log('record-------', record);
        console.log('record ID----', record[0].dataValues.id);
        db.Submission.create({
          title: req.body.title,
          link: req.body.link,
          description: req.body.description,
          votes: 0,
          official: 1,
          UserId: req.body.userId,
          RecordId: record[0].dataValues.id,
          measurement: req.body.measurement,
          state: req.body.state
        }).then(submission => res.sendStatus(201))
          .catch(error => console.error(error))
      })
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
      db.Submission.findOne({ where : { link: req.params.id } })
        .then(submission => {
          console.log('SBSSS', submission)
          let vote = submission.votes;
          vote++;
          db.Submission.update({votes: vote}, { where : { link: req.params.id } })
            .then(response => res.json({id: submission.id, votes: vote}))
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

    findAllFlagged(req, res) {
      db.Submission.findAll({ where: { official: { $lt: 1 } } })
        .then(submissions => res.json(submissions))
        .catch(err => console.error(err))
    },

    toggleOfficial(req, res) {
      db.Submission.findOne({ where : { id: req.params.id } })
        .then(submission => {
          let official;
          if (submission.official === 1) {
            official = 0
          } else if (submission.official < 1) {
            official = 1
          }
          db.Submission.update({
            official
          } , { where : { id: req.params.id } })
            .then(submission => res.json(submission))
            .catch(error => console.error(error))
        })
    },

    adminRemove(req, res) {
      db.Submission.update({
        official: -1
      } , { where : { id: req.params.id } })
        .then(submission => res.json(submission))
        .catch(error => console.error(error))
    },

    delete(req, res) {
      db.Comment.destroy({ where: { SubmissionId: req.params.id } });
      db.Vote.destroy({ where: { SubmissionId: req.params.id } });
      db.Submission.destroy({ where: { id: req.params.id } })
        .then(submission => res.json(submission))
        .catch(error => console.error(error))
    },

    testAdd(req, res) {
      db.Submission.create({
          title: "Title of the video",
          link: "https://www.youtube.com/embed/a1Y73sPHKxw",
          description: "This is the best video ever",
          votes: 0,
          measurement: 10000,
          official: '1',
          UserId: 6,
          RecordId: 5
      })
      .then(submission => res.sendStatus(201))
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

    findAllWhere(req, res) {
      db.Comment.findAll({ where: { SubmissionId: req.params.submissionid } })
        .then(comments => res.json(comments))
        .catch(err => console.error(err))
    },

    findByUser(req, res) {
      console.log('USERID', req.params.userid)
      db.Comment.findAll({
          include: [{model: db.Submission, required: true}],
          where: {UserId: req.params.userid} })
        .then(comments => res.json(comments))
        .catch(err => console.error(err))
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
      console.log('VOTEADD', req.body.submissionId, req.body.userId)
      db.Vote.create({
        voted: 1,
        UserId: req.body.userId,
        SubmissionId: req.body.submissionId
      })
      .then(vote => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.Vote.findOne({ where : { UserId: req.params.userid, SubmissionId: req.params.submissionid } })
        .then(vote => res.json(vote))
        .catch(error => console.error(error))
    },

    toggleVote(req, res) {
      db.Vote.findOne({ where : { UserId: req.params.userid, SubmissionId: req.params.submissionid } })
        .then(vote => {
          let voted;
          if (vote.voted) {
            voted = 0;
          } else {
            voted = 1;
          }
          db.Vote.update({ voted } , { where : { UserId: req.params.userid, SubmissionId: req.params.submissionid } })
            .then(vote => res.json(vote))
            .catch(error => console.error(error))
        })
    },

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

  },

  ////
  community: {
    findAll(req, res) {
      db.Community.findAll()
      .then(communities => res.json(communities))
      .catch(err => console.error(error))
    },

    add(req, res) {
      db.Community.create({
        name: req.body.name,
        description: req.body.description
      })
      .then(community => res.sendStatus(201))
      .then()
      .catch(error => console.error(error))
    },

    findAllMembers(req, res) {
      db.UsersCommunitiesJoin.findAll({ where: { CommunityId: req.params.communityid } })
        .then(users => res.json(users))
        .catch(err => console.error(err))
    },

    findAllCommunities(req, res) {
      db.UsersCommunitiesJoin.findAll({ where: { UserId: req.params.userid } })
        .then(communities => res.json(communities))
        .catch(err => console.error(err))
    },

  },

  communityComments: {
    findAll(req, res) {
      db.CommunityComment.findAll()
      .then(comments => res.json(comments))
      .catch(err => console.error(error))
    },

    findForOne(req, res) {
      db.CommunityComment.findAll({ where: {
        SubmissionId: req.params.submissionid,
        CommunityId: req.params.communityid }
      })
        .then(comments => res.json(comments))
        .catch(err => console.error(err))
    },

  },

  communityBulletins: {
    findAll(req, res) {
      db.CommunityBulletin.findAll()
      .then(bulletins => res.json(bulletins))
      .catch(err => console.error(error))
    },

    findForOne(req, res) {
      db.CommunityBulletin.findAll({ where: { CommunityId: req.params.communityid } })
        .then(bulletins => res.json(bulletins))
        .catch(err => console.error(err))
    },

  },



}