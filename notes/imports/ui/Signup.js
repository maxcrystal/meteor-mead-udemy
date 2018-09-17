import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';

import BoxedView from './BoxedView.js';
import yup from "yup";


export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loggedIn: !!Meteor.userId(),
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.refs.input.value.trim();
    let password = this.refs.password.refs.input.value.trim();

    yup.object({
      email: yup.string().email().required().trim().label('Email'),
      password: yup.string().min(9).required().trim().label('Password'),
    }).validate({email, password})
      .then(({email, password}) => {
        this.props.createUser({email, password}, error => {
          if (!error) {
            this.setState({
              error: '',
              loggedIn: !!Meteor.userId(),
            });
          } else {
            this.setState({error: error.reason});
          }
        });
      })
      .catch(error => {
        this.setState({error: error.message});
      })
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <BoxedView className="shadow">
          <h2>Join</h2>
          <Alert onClick={() => this.setState({error: ''})} isOpen={!!this.state.error} className="fixed-top m-1" color="danger">{this.state.error}</Alert>
          <Form onSubmit={this.onSubmit.bind(this)} noValidate>
            <FormGroup>
              <Input className="boxed-view__item" type="email" name="email" ref="email" innerRef="input" placeholder="Email" autoComplete="email"/>
              <Input className="boxed-view__item" type="password" name="password" ref="password" innerRef="input" placeholder="Password" autoComplete="new_password"/>
            </FormGroup>
            <Button className="boxed-view__item" color="primary" block>Create Account</Button>
          </Form>
          <Link className="boxed-view__link" to="/">Have an account?</Link>
        </BoxedView>
      );
    } else {
      return <Redirect to={this.props.redirect}/>;
    }
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default withTracker(props => {
  return {
    createUser: Accounts.createUser,
    redirect: '/dashboard',
  };
})(Signup);

