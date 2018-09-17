import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from './TitleBar.js';
import AddPlayer from './AddPlayer.js';
import PlayerList from './PlayerList.js';


export default class App extends React.Component {
  render() {
    return(
      <div>
        <TitleBar title={this.props.title} subtitle="Created by Max"/>
        <div className="wrapper">
          <PlayerList players={this.props.players}/>
          <AddPlayer/>
        </div>
      </div>
    );
  };
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
};