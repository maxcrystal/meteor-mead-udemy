import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';


export default class PrivateHeader extends React.Component {
  state = {
    loggedIn: !!Meteor.userId(),
  };

  onLogout() {
    Accounts.logout(error => {
      this.setState({loggedIn: !!Meteor.userId()});
    });
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="title-bar">
          <div className="title-bar__content">
            <h1 className="title-bar__title">{this.props.title}</h1>
            <button className="button button--nav" onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

PrivateHeader.propTypes = {
  'title': PropTypes.string.isRequired,
}