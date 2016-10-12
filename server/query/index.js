const db = require('../db/index.js')

let testToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VyQGpvLmNvbSIsImlhdCI6MTQ3NTUzODExNzU1Nn0.Izn7gl9sVI21PdrKQYuhgI2yGdE01C6VbstOQmvTBmY"

let checkUserType = (token, type, callback, res) => {
  db.User.find({ where: {test: token }})
  .then((user)=>{
      if (Number(user.type) >= type) {
        callback();
      } else {
        res.sendStatus(404)
      }
  }).catch((err)=> console.error(err))
}

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
        frozen: 0,
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
      db.User.findAll({
        include: [{
          model: db.Submission, required: true, include: [
            {model: db.Record}]
        }],
        where: {id: req.params.id}
      })
      .then(data => res.json(data))
      .catch(error => console.error(error))
    },

    update(req, res) {

      let authedAction = () => {
        db.User.findOne({ where : { id: req.params.id } })
          .then(user => {
            let type = req.body.type || user.type;
            let frozen = req.body.frozen === undefined ? user.frozen : req.body.frozen;
            db.User.update({
              type,
              frozen
            } , { where : { id: req.params.id } })
              .then(user => res.json(user))
              .catch(error => console.error(error))
          })
          .catch(error => console.error(error))
      }

      checkUserType(req.body.token, 2, authedAction, res);

    },

    delete(req, res) {

      let authedAction = () => {
        db.Submission.destroy({ where: { UserId: req.params.id } });
        db.Comment.destroy({ where: { UserId: req.params.id } });
        db.Vote.destroy({ where: { UserId: req.params.id } });
        db.User.destroy({ where: { id: req.params.id } })
          .then(user => res.json(user))
          .catch(error => console.error(error))
      }

      checkUserType(req.body.token, 3, authedAction, res);

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
      db.Submission.findAll({ where: { public: 1 }, include: [ db.User, db.Record ] })
        .then(submissions => res.json(submissions))
        .catch(err => console.error(err))
    },

    findAllPublic(req, res) {
      db.Submission.findAll({ where: { public: 1, RecordId: req.params.id }, include: [ db.User, db.Record ], order: [['createdAt', 'ASC']] })
        .then(submissions => res.json(submissions))
        .catch(err => console.error(err))
    },

    findACommunity(req, res) {
      db.Submission.findAll({ where: { RecordId: req.query.rid, CommunityId: req.query.cid }, include: [ db.User, db.Record ], order: [['createdAt', 'ASC']] })
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
          state: req.body.state,
          public: req.body.public,
          CommunityId: req.body.CommunityId

        }).then(submission => res.sendStatus(201))
          .catch(error => console.error(error))
      })
    },


    addChallenge(req, res) {
      db.Submission.create({
          title: req.body.title,
          link: req.body.link,
          description: req.body.description,
          votes: 0,
          official: 1,
          UserId: req.body.userId,
          RecordId: req.body.recordId,
          measurement: req.body.measurement,
          state: req.body.state,
          public: req.body.public
      })
      .then(submission => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    findOne(req, res) {
      db.Submission.findOne({ where: { id: req.params.id } })
        .then(submission => res.json(submission))
        .catch(error => console.error(error))
    },

    findOneCommunity(req, res) {
      db.Submission.findAll({ where: { CommunityId: req.params.id }, include: [ db.User, db.Record ] })
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

      let authedAction = () => {
        db.Submission.findOne({ where : { link: req.params.id } })
          .then(submission => {
            let vote = submission.votes;
            vote++;
            db.Submission.update({votes: vote}, { where : { link: req.params.id } })
              .then(response => res.json({id: submission.id, votes: vote}))
              .catch(error => console.error(error))
          })
      }

      checkUserType(req.body.token, 1, authedAction, res)
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
      db.Submission.findAll({ where: { official: { $lt: 1 } }, include: [ db.Record ] })
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
      console.log('inside delete submission');
      db.Comment.destroy({ where: { SubmissionId: req.params.id } });
      db.Vote.destroy({ where: { SubmissionId: req.params.id } });
      db.CommunityComment.destroy({ where: { SubmissionId: req.params.id } });
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
      db.Comment.findAll({ include: [ db.User ] })
      .then(comments => res.json(comments))
      .catch(err => console.error(error))
    },

    findAllWhere(req, res) {
      db.Comment.findAll({
        include: [ db.User ],
        where: { SubmissionId: req.params.submissionid } })
        .then(comments => res.json(comments))
        .catch(err => console.error(err))
    },

    findByUser(req, res) {
      console.log('USERID', req.params.userid)
      db.Comment.findAll({
          include: [{model: db.Submission, required: true, include: [{
            model: db.Record}]
          }],
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

    findByUser(req, res) {
      console.log('----Inside Vote find by users', req.params.userid)
      db.Vote.findAll({
          include: [{model: db.Submission, required: true, include: [{model: db.Record}]
          }],
          where: {UserId: req.params.userid} })
        .then(votes => res.json(votes))
        .catch(err => console.error(err))
    },

    add(req, res) {

      let authedAction = () => {
        db.Vote.create({
          voted: 1,
          UserId: req.body.userId,
          SubmissionId: req.body.submissionId
        })
        .then(vote => res.sendStatus(201))
        .catch(error => console.error(error))
      }

      checkUserType(req.body.token, 1, authedAction, res);

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
    // find all the currently existing communities
    findAll(req, res) {
      db.Community.findAll()
      .then(communities => res.json(communities))
      .catch(err => console.error(error))
    },

    // find one community
    findCommunity(req, res) {
      db.Community.findAll({where:{ id: req.params.id}})
        .then(community=> res.json(community))
        .catch(error=>console.error(error))
    },

    // add a community
    addCommunity(req, res) {
      db.Community.create({
        name: req.body.name,
        description: req.body.description
      })
      .then(community => res.json(community))
      .catch(error => console.error(error))
    },

    // find all the members that are part of a given community
    findAllMembers(req, res) {
      db.UsersCommunitiesJoin.findAll({ where: { CommunityId: req.params.communityid } })
        .then(users => res.json(users))
        .catch(err => console.error(err))
    },

    // find all the communities a given member is a part of
    findAllCommunities(req, res) {
      db.UsersCommunitiesJoin.findAll({ where:{UserId: req.params.userid }, include:[db.Community] })
        .then(communities => res.json(communities))
        .catch(err => console.error(err))
    },

    // add a member to a community
    addMembership(req, res) {
      db.UsersCommunitiesJoin.create({
        UserId: req.body.userid,
        CommunityId: req.body.submissionid
      })
      .then(membership => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    createAndJoinCommunity(req, res) {
      db.Community.create({
        name: req.body.name,
        description: req.body.description
      })
      .then(community => {
        db.UsersCommunitiesJoin.create({
        UserId: req.body.userid,
        CommunityId: community.dataValues.id
        // automatically uses newly created community
      })
      .then(membership => res.sendStatus(201))
      .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
    },

  },

  communityComments: {
    findAll(req, res) {
      db.CommunityComment.findAll()
      .then(comments => res.json(comments))
      .catch(err => console.error(error))
    },

    findForOne(req, res) {
      console.log("sid, cid", req.query.sid, req.query.cid)
      db.CommunityComment.findAll({ where: {
        SubmissionId: req.query.sid,
        CommunityId: req.query.cid },
        include: [ db.User, db.Submission ]
      })
        .then(comments => res.json(comments))
        .catch(err => console.error(err))
    },

    add(req, res) {
      db.CommunityComment.create({
        title: req.body.title,
        description: req.body.description,
        pinned: 0,
        UserId: req.body.userId,
        SubmissionId: req.body.submissionId,
        CommunityId: req.body.communityId
      })
      .then(comment => res.sendStatus(201))
      .catch(error => console.error(error))
    }
  },

  communityBulletins: {
    findAll(req, res) {
      db.CommunityBulletin.findAll()
      .then(bulletins => res.json(bulletins))
      .catch(err => console.error(error))
    },

    findForOne(req, res) {
      db.CommunityBulletin.findAll({ where: { CommunityId: req.params.id }, include: [ db.User ] })
        .then(bulletins => res.json(bulletins))
        .catch(err => console.error(err))
    },

    add(req, res) {
      db.CommunityBulletin.create({
        subject: req.body.subject,
        message: req.body.message,
        pinned: 0,
        UserId: req.body.userId,
        CommunityId: req.body.communityId
      })
      .then(bulletin => res.sendStatus(201))
      .catch(error => console.error(error))
    },

    togglePin(req, res) {
      db.CommunityBulletin.findOne({ where : { id: req.params.id } })
        .then(bulletin => {
          let pinned;
          if (bulletin.pinned === 0) {
            pinned = 1;
          } else {
            pinned = 0;
          }
          db.CommunityBulletin.update({ pinned } , { where : { id: req.params.id } })
            .then(bulletin => res.json(bulletin))
            .catch(error => console.error(error))
        })
    },

  },

  image: {
    add(req, res) {
      db.Image.find({where: { uid: req.body.user }})
        .then((data)=> {
          // console.log('found dis', data)
          if (!data) {
            db.Image.create({
              uid: req.body.user,
              json: req.body.data
            }).then((data)=>res.sendStatus(200))
          } else {
            db.Image.update({
              json: req.body.data
            }, {where: {uid: req.body.user}}).then((data)=>res.sendStatus(200))
          }
        })
    },

    get(req, res) {
      let user = Number(req.params.id)
      // console.log('hi', user)
      db.Image.findOne({where: {uid: user}})
        .then((data)=>{
          // console.log('data', data)
          res.json(data)
        })
    }
  },

  notifications: {
    allCommunityInvites(req, res){
      db.CommunityInvite.findAll()
      .then(invites=> res.json(invites))
      .catch(error=> console.error(error))
    },

    sendInvite(req, res) {
      db.CommunityInvite.create({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        done: 0,
        CommunityId: req.body.communityId
      })
      .then(invite=> res.sendStatus(201))
      .catch(error=> console.error(error))
    },

    clearInvite(req, res) {
      db.CommunityInvite.destroy({ where: { id: req.params.id } })
        .then(invite=> res.json(invite))
        .catch(error => console.error(error))
    },

    allFlaggedVideos(req, res){
      db.FlaggedVideo.findAll()
      .then(videos=> res.json(videos))
      .catch(error=> console.error(error))
    },

    flagVideo(req, res) {
      db.FlaggedVideo.create({
        reason: req.body.reason,
        done: 0,
        UserId: req.body.userid,
        SubmissionId: req.body.submissionid
      })
    },

    clearFlaggedVideo(req, res) {
      db.FlaggedVideo.destroy({ where: { id: req.params.id } })
        .catch(error => console.error(error))
    }

  }

}
