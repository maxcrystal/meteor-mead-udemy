import { Meteor } from 'meteor/meteor';
import should from 'should';

import db from './../../imports/api/db';
import './../../imports/api/notes';


if (Meteor.isServer) {
  describe('db.notes', function() {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'Title 1',
      body: 'Body 2',
      updatedAt: 0,
      userId: 'testUserId1',
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Title 2',
      body: 'Body 2',
      updatedAt: 0,
      userId: 'testUserId2',
    };

    beforeEach(function() {
      db.notes.remove({});
      db.notes.insert(noteOne);
      db.notes.insert(noteTwo);
    });

    afterEach(function() {
      db.notes.remove({});
    });

    it('should insert new note', function() {
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: noteOne.userId})

      db.notes.findOne({_id, userId: noteOne.userId}).should.be.ok;
    });

    it('should not insert note if not authenticated', function() {
      (() => {
        Meteor.server.method_handlers['notes.insert']();
      }).should.throw();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);  // the second arg is a list of args to pass to function
      (db.notes.findOne({_id: noteOne.noteId}) === null).should.be.ok;
    });

    it('should not remove if not authenticated', function() {
      (() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);  // the second arg is a list of args to pass to function
      }).should.throw();
    });

    it('should not remove note if invalid id', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [`invalid ${noteOne._id}`]);  // the second arg is a list of args to pass to function
      db.notes.findOne({_id: noteOne._id}).should.be.ok;
    });

    it('should update note', function() {
      const title = 'New Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      }, [
        noteOne._id,
        {title},
      ]);
      const note = db.notes.findOne(noteOne._id);
      note.updatedAt.should.be.above(0);
      note.should.containDeep({
        title,
        body: noteOne.body,
      });
    });

    it('should ignore extra paramters when try to set', function () {
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      }, [
        noteOne._id,
        {text: "New body"},
      ]);
      db.notes.findOne({_id: noteOne._id}).should.not.have.keys('text');
    });

    it('should not update note if user was not creator', function() {
      const title = 'New Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: `invalid ${noteOne.userId}`,
      }, [
        noteOne._id,
        {title},
      ]);
      const note = db.notes.findOne(noteOne._id);
      note.should.containEql(noteOne);
    });

    it('should not update if not authenticated', function() {
      (() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);  // the second arg is a list of args to pass to function
      }).should.throw();
    });

    it('should not update note if invalid id', function() {
      Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [`invalid ${noteOne._id}`]);  // the second arg is a list of args to pass to function
      db.notes.findOne({_id: noteOne._id}).should.be.ok;
    });

    it('should return user notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      notes.length.should.equal(1);
      notes[0].should.eql(noteOne);
    });

    it('should not return note if user have none', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: `invalid ${noteOne.userId}`});
      const notes = res.fetch();
      notes.length.should.equal(0);
    });

  });
}




