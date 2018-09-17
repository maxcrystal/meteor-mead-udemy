import React from 'react';

import {Players} from './../api/players.js';


export default class AddPlayer extends React.Component {
  handleSubmit(e) {
    let playerName = e.target.playerName.value;

    e.preventDefault();

    if (playerName && typeof(playerName) == 'string') {
      e.target.playerName.value = '';
      Players.insert({
        name: playerName,
        score: 0,
      });
    }
  };
  render() {
    // Use bind() to preserve this object when passes it to function
    return(
      <div className="item">
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="form__input" type="text" name="playerName" placeholder="Player name"/>
          <button className="button">Add player</button>
        </form>
      </div>
    );
  };
};