import { Meteor } from 'meteor/meteor';
import should from 'should';

import { validateNewUser } from './../../imports/api/users';


if (Meteor.isServer) {
  describe('db.users', function() {
    it('should allow valid email', function() {
      const testUser = {
        emails: [
          {
            address: 'test@example.com',
          },
        ]
      };
      const res = validateNewUser(testUser);

      res.should.be.ok;
    });

    it('should reject invalid email', function() {
      (() => {
        const testUser = {
          emails: [
            {
              address: 'testexamplecom',
            },
          ]
        };
        validateNewUser(testUser);
      }).should.throw();
    })
  });
}
