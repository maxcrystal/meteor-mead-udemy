import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';


export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({userId: this.userId});
  }); 
}

// pattern: resource.action
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'The link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({url});

    Links.insert({
      // _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },

  'links.setVisibility'(linkId, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      linkId: {
        type: String,
        min: 1,
      },
      visible: {
        type: Boolean,
      },
    }).validate({linkId, visible});

    Links.update({
      _id: linkId,
      userId: this.userId,
    }, {
      $set: {visible},
    });
  },

  'links.trackVisit'(linkId) {
    new SimpleSchema({
      linkId: {
        type: String,
        min: 1,
      },
    }).validate({linkId});

    Links.update({_id: linkId}, {
      $set: {lastVisitedAt: new Date().getTime()},
      $inc: {visitedCount: 1},
    });
  },
});
