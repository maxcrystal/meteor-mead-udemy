import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { NoteListItem } from './../../imports/ui/NoteListItem';
import { notes } from './../fixtures/fixtures';


if (Meteor.isClient) {

  describe('NoteListItem', function() {
    let Session;
    let history;

    beforeEach(() => {
      Session = {
        set: sinon.spy(),
      };
      history = {
        replace: sinon.spy(),
      };
    });

    it('should render title and timestamp', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);

      wrapper.find('h5').text().should.be.eql(notes[0].title);
      wrapper.find('p').text().should.be.eql(moment(notes[0].updatedAt).format('D.MM.Y'));
    });

    it('should render base title if not provided', function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);

      wrapper.find('h5').text().should.be.eql('Untitled');
      wrapper.find('p').text().should.be.eql(moment(notes[1].updatedAt).format('D.MM.Y'));
    });

    it('should call Session.set and history.repace on click', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} history={history}/>);

      wrapper.find('div').simulate('click');
      Session.set.should.be.calledWith('selectedNoteId', notes[0]._id);
      history.replace.should.be.calledWith(`/dashboard/${notes[0]._id}`);
    });

  });
}

