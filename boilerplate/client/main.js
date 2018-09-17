import './main.html';

import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
// import {Tracker} from 'meteor/tracker';

import Routs from './../imports/routs/routs.js';
import './../imports/startup/simpl-schema-config.js';

Meteor.startup(() => {
  ReactDOM.render((<Routs/>), document.getElementById('app'));
});
