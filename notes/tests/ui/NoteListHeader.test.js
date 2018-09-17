import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { NoteListHeader } from './../../imports/ui/NoteListHeader';
import { notes } from './../fixtures/fixtures';


if (Meteor.isClient) {
  let meteorCall;
  let Session;
  let history = {
    push: sinon.spy(),
  };

  beforeEach(() => {
    meteorCall = sinon.spy();
    Session = {
      set: sinon.spy(),
    };
  })

  describe('NoteListHeader', function() {

    it('should call meteorCall on click', function() {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} history={history}/>);

      wrapper.find('button').simulate('click');
      meteorCall.should.be.calledWith('notes.insert');

      meteorCall.getCalls()[0].args[1](undefined, notes[0]._id);
      Session.set.should.be.calledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set Session for faild insert', function() {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} history={history}/>);

      wrapper.find('button').simulate('click');
      meteorCall.should.be.calledWith('notes.insert');

      meteorCall.getCalls()[0].args[1]('Error', undefined);
      Session.set.should.not.be.called;
    });

  });
}
