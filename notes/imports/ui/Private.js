import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


export default class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!Meteor.userId(),
    };
  }

  componentDidMount() {
    this.loginTracker = Tracker.autorun(() => {
      this.setState({
        loggedIn: !!Meteor.userId(),
      });
    });
  }

  componentWillUnmount() {
    this.loginTracker.stop();
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else if (!this.state.loggedIn && this.props.redirect) {
      return <Redirect to={this.props.redirect} />;
    } else {
      return undefined;
    }
  }
}

Private.propTypes = {
  'redirect': PropTypes.string,
}

Private.defaultProp = {
  'redirect': null,
}
