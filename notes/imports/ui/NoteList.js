import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import db from './../api/db';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export class NoteList extends React.Component {
  componentDidMount() {
    Session.set('selectedNoteId', this.props.match.params.id);
  }

  render() {
    return (
      <Container className="page-content__sidebar border rounded p-0 mr-3">
        <NoteListHeader />
          <div className="mt-3">
          {this.props.notes.length ? undefined : <NoteListEmptyItem />}
          {this.props.notes.map(note => (
            <NoteListItem key={note._id} note={note} history={this.props.history}/>
          ))}
          </div>
      </Container>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');
  const searchString = Session.get('searchString');

  Meteor.subscribe('notes');

  return {
    notes: db.notes.find({title: {$regex: searchString, $options: 'i'}}, {sort: {updatedAt: -1}}).fetch().map(note => {
      return {
        ...note,
        selected: note._id === selectedNoteId,
      };
    }),
  };
})(withRouter(NoteList));
