import './main.html';

import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players, calculatePlayerPosition} from './../imports/api/players.js';
import App from './../imports/ui/App.js';


Meteor.startup(() => {
  
  Tracker.autorun(() => {
    let title = 'Score Keep';
    let players = Players.find({}, {sort: {score: -1, name: 1}}).fetch();
    let positionedPlayers = calculatePlayerPosition(players);

    ReactDOM.render(<App title={title} players={positionedPlayers}/>, document.getElementById('app'));
  });
});