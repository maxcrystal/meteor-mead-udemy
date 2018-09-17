import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import db from './../api/db';


export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      modal: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
      });
      this.refs.title.refs.input.focus();
    }
  }

  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id, {body});
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update', this.props.note._id, {title});
  }

  handleDeleteNote() {
    this.props.call('notes.remove', this.props.note._id);
    Session.set('selectedNoteId', undefined);
    this.props.history.push('/dashboard');
    this.handleToggleModal();
  }

  handleToggleModal() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    if (this.props.note) {
      return (
        <Container className="page-content__main border rounded pb-3 d-flex flex-column align-items-stretch" style={{height:'100%'}}>
          <Input className="editor__title" ref="title" innerRef="input" value={this.state.title} placeholder="Untitled" onChange={this.handleTitleChange.bind(this)} />
          <Input className="editor__body flex-grow-1" type="textarea" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
          <div>
            <Button className="mt-3" outline color="secondary" onClick={this.handleToggleModal.bind(this)}>Delete Note</Button>
            <Modal isOpen={this.state.modal} toggle={this.handleToggleModal.bind(this)}>
              <ModalHeader>Delete "{this.state.title}"?</ModalHeader>
              <ModalBody>Are you sure you want to delete the note? This action can not be undone.</ModalBody>
              <ModalFooter>
                <Button id="delete-note" color="danger" onClick={this.handleDeleteNote.bind(this)}>Delete</Button>
                <Button color="secondary" onClick={this.handleToggleModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
      );
    } else {
      return (
        <Container className="page-content__main border rounded pb-3 d-flex flex-column align-items-stretch" style={{height:'100%'}}>
          <p className="editor__message">
            {this.props.selectedNoteId ? 'Note not found' : 'Pick a note to get started'}
          </p>
        </Container>
      );
    }
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
};

export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: db.notes.findOne(selectedNoteId),
    call: Meteor.call,
  };
})(withRouter(Editor));
