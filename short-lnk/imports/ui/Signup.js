import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

export default class Signup extends React.Component {
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

    if (password.length < 9) {
      this.setState({error: 'Password must be at least 9 characters long'});
      return;
    }

    Accounts.createUser({email, password}, error => {
      if (!error) {
        this.setState({
          error: '',
          loggedIn: !!Meteor.userId()});
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
            <h1>Join to Short Lnk</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" name="email" ref="email" placeholder="Email" autoComplete="email"/>
              <input type="password" name="password" ref="password" placeholder="Passwoed" autoComplete="new_password"/>
              <button className="button">Create Account</button>
            </form>

            <Link to="/">Have an account?</Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/links"/>;
    }
  }
}
