import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import React from 'react';
import ReactDOM from 'react-dom';

import Routs from './../imports/routs/Routs.js';

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);
  // console.log(selectedNoteId);
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  Session.set('searchString', '');
  ReactDOM.render(<Routs />, document.getElementById('app'));
});
