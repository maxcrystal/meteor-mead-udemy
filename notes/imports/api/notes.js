import { Meteor } from 'meteor/meteor';

import db from './db';


if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return db.notes.find({userId: this.userId});
  });
}

// Set client-side methods
Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const options = {
      schema: {
        title: db.notes.fields.title.default('New Title'),
        body: db.notes.fields.body.default(''),
      }
    };
    const doc = db.notes.validateSync({ userId: this.userId }, options);
    const noteId = db.notes.insert(doc);

    return noteId;
  },

  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const options = {
      schema : { _id: db.notes.fields._id.required() },
      strict: true,
    };
    const doc = db.notes.validateSync({ _id, userId: this.userId }, options);

    db.notes.remove(doc);
  },

  'notes.update'(_id, update) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const doc = db.notes.validateSync({ _id, ...update });
    const updatedCount = db.notes.update(
      { _id, userId: this.userId },
      { $set: {...doc} }
    );

    return updatedCount;
  }
});
