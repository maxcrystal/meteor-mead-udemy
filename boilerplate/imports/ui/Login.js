import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loggedIn: !!Meteor.userId(),
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, error => {
      if (!error) {
        this.setState({
          error: '',
          loggedIn: !!Meteor.userId(),
        });
      } else {
        this.setState({error: error.reason});
      }
    });
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" name="email" ref="email" placeholder="Email" autoComplete="email"/>
              <input type="password" name="password" ref="password" placeholder="Password" autoComplete="current_password"/>
              <button className="button">Login</button>
            </form>

            <Link to="/signup">Create an account?</Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/dashboard"/>;
    }
  };
};
