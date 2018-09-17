import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { NoteList } from './../../imports/ui/NoteList';
import { notes } from './../fixtures/fixtures';


if (Meteor.isClient) {

  let match = {
    params: {id: undefined},
  };

  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<BrowserRouter><NoteList notes={notes} match={match} /></BrowserRouter>);
      wrapper.find('NoteListItem').length.should.be.eql(2);
      wrapper.find('NoteListEmptyItem').length.should.be.eql(0);
    });

    it('should render NoteListEmptyItem if no notes', function() {
      const wrapper = mount(<BrowserRouter><NoteList notes={[]} match={match} /></BrowserRouter>);
      wrapper.find('NoteListItem').length.should.be.eql(0);
      wrapper.find('NoteListEmptyItem').length.should.be.eql(1);
    });

  });
}
