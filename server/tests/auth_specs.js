import { expect, assert } from 'chai';
import Auth from '../query/auth';
import Sinon from 'sinon';

describe('auth functions', () => {

  describe('', () => {

    it('returns a 422 response if info is missing', (done) => {
      let res = {
        send: function(){ },
        json: function(err){
            console.log("\n : " + err);
        },
        status: function(responseStatus) {
          console.log(responseStatus)
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

});