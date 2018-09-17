import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount, shallow } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { user } from './../fixtures/fixtures';
import { Signup }from './../../imports/ui/Signup';


if (Meteor.isClient) {

  describe('Signup', function() {

    it('should show error message', function() {
      const error = 'The Error';
      const wrapper = mount(<BrowserRouter><Signup createUser={() => {}} redirect="/" /></BrowserRouter>)

      wrapper.find(Signup).instance().setState({error});
      wrapper.update();
      wrapper.find('Alert').text().should.be.eql(error);
    });

    it('should call createUser with the form data', function(done) {
      const spy = sinon.spy((...args) => {
        try {
          args.should.containDeep([user])
        } catch (err) {
          done(err);
        }
        done();
      });

      const wrapper = mount(<BrowserRouter><Signup createUser={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = user.email;
      inputNodes.find({type: "password"}).instance().value = user.password;

      wrapper.find('form').simulate('submit');
      // spy.should.be.calledWith({email, password});
    });

    it('should show error message if short password provided', function(done) {
      const shortPassword = '123';

      const wrapper = mount(<BrowserRouter><Signup createUser={() => {}} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = user.email;
      inputNodes.find({type: "password"}).instance().value = shortPassword;

      wrapper.find('form').simulate('submit');

      // I think this should be changed somehow
      setTimeout(() => {
        wrapper.find(Signup).instance().state.error.should.not.be.eql('');
        done();
      }, 1);
    });

    it('should set createUser callback errors', function(done) {
      const reason = 'fuck you, that\'s why';

      const spy = sinon.spy((...args) => {
        try {
          args[1]({reason});
          wrapper.find(Signup).instance().state.error.should.be.eql(reason);

          args[1]();
          wrapper.find(Signup).instance().state.error.should.be.eql('');
        } catch (err) {
          done(err);
        }
        done();
      });

      const wrapper = mount(<BrowserRouter><Signup createUser={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = user.email;
      inputNodes.find({type: "password"}).instance().value = user.password;

      wrapper.find('form').simulate('submit');

      // spy.args[0][1]({reason});
      // wrapper.find(Signup).instance().state.error.should.be.eql(reason);
      //
      // spy.args[0][1]();
      // wrapper.find(Signup).instance().state.error.should.be.eql('');
    });

  });
}

