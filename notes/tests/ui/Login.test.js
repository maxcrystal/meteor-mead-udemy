import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { user } from './../fixtures/fixtures';
import { Login } from './../../imports/ui/Login';


if (Meteor.isClient) {

  describe('Login', function() {

    it('should show error message', function() {
      const error = 'The Error';
      const wrapper = mount(<BrowserRouter><Login loginWithPassword={() => {}} redirect="/" /></BrowserRouter>)

      wrapper.find(Login).instance().setState({error});
      wrapper.update();
      wrapper.find('Alert').text().should.be.eql(error);
    });

    it('should call loginWithPassword with the form data', function(done) {
      const spy = sinon.spy((...args) => {
        try {
          args.should.containDeep([{email: user.email}, user.password]);
        } catch (err) {
          done(err);
        }
        done();
      });

      const wrapper = mount(<BrowserRouter><Login loginWithPassword={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = user.email;
      inputNodes.find({type: "password"}).instance().value = user.password;

      wrapper.find('form').simulate('submit');

      // spy.should.be.calledWith({email}, password);

    });

    it('should set loginWithPassword callback errors', function(done) {
      const reason = 'fuck you, that\'s why';

      const spy = sinon.spy((...args) => {
        try {
          args[2]({reason});
          wrapper.find(Login).instance().state.error.should.be.eql(reason);

          args[2]();
          wrapper.find(Login).instance().state.error.should.be.eql('');
        } catch (err) {
          done(err)
        }
        done();
      });

      const wrapper = mount(<BrowserRouter><Login loginWithPassword={spy} redirect="/" /></BrowserRouter>);

      const inputNodes = wrapper.find('input');

      inputNodes.find({type: "email"}).instance().value = user.email;
      inputNodes.find({type: "password"}).instance().value = user.password;

      wrapper.find('form').simulate('submit');

      // spy.args[0][2]({reason});
      // wrapper.find(Login).instance().state.error.should.be.eql(reason);
      //
      // spy.args[0][2]();
      // wrapper.find(Login).instance().state.error.should.be.eql('');
    });

  });
}

