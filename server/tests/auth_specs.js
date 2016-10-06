import { expect, assert } from 'chai';
import Auth from '../query/auth';
import Sinon from 'sinon';
import db from '../db/index'


describe('auth functions', () => {

  describe('signup method', () => {
    before(()=>{
      db.sync({force: true});
    )

    it('returns a 422 response if info is missing', (done) => {
      let res = {
        send: function(msg){
          expect(msg.error).to.equal('Provide email AND password')
        },
        json: function(err){
            console.log("\n : " + err);
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 422);
            // This next line makes it chainable
            return this;
        }
      }
      // missing password in req
      let req = {body: {email: 'testemail'}}
      let response = Auth.signup(req, res);
      done();
    });

  });

  it('returns a 422 if email already exists', (done)=> {
    let res = {
        send: function(msg){
          expect(msg.error).to.equal('Email in use')
        },
        json: function(err){
            console.log("\n : " + err);
        },
        status: function(responseStatus) {
            assert.equal(responseStatus, 422);
            // This next line makes it chainable
            return this;
        }
      }
    db.User.create({
      email: 'testemail',
      psasword: 'testpass'
    }).then(function(){
      let req = {body: {email: 'testemail', password: 'testpass'}}
      let response = Auth.signup(req, res);
      done();
    })
  })

});
