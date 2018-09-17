import { Meteor } from 'meteor/meteor';
import React from 'react';

import { mount } from 'enzyme';
import should from 'should';
import sinon from 'sinon';
import 'should-sinon';

import { Editor } from './../../imports/ui/Editor';
import { notes } from './../fixtures/fixtures';


if (Meteor.isClient) {
  let history;
  let call;

  describe('Editor', function() {

    beforeEach(function() {
      call = sinon.spy();
      history = {
        push: sinon.spy(),
      };
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor history={history} call={call} />);

      wrapper.find('p').text().should.be.eql('Pick a note to get started');
    });

    it('should render note not found message', function() {
      const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id}/>);

      wrapper.find('p').text().should.be.eql('Note not found');
    });

    it('should remove message', function() {
      const wrapper = mount(<Editor history={history} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.setState({modal: true});
      wrapper.find('button#delete-note').simulate('click');
      call.should.be.calledWith('notes.remove', notes[0]._id);
      history.push.should.be.calledWith('/dashboard');
    });

    it('should update note body on editor textarea change', function() {
      const newBody = 'New Body';
      const wrapper = mount(<Editor history={history} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody,
        }
      });

      wrapper.state('body').should.be.eql(newBody);
      call.should.be.calledWith('notes.update', notes[0]._id, {body: newBody});
    });

    it('should update note title on editor input change', function() {
      const newTitle = 'New Title';
      const wrapper = mount(<Editor history={history} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle,
        }
      });

      wrapper.state('title').should.be.eql(newTitle);
      call.should.be.calledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    it('should set state for new note', function() {
      const wrapper = mount(<Editor history={history} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0],
      });

      wrapper.state().title.should.be.eql(notes[0].title);
      wrapper.state().body.should.be.eql(notes[0].body);
    });

    it('should not set state if note prop not provided', function() {
      const wrapper = mount(<Editor history={history} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });

      wrapper.state().title.should.be.eql('');
      wrapper.state().body.should.be.eql('');
    });


  });
}
