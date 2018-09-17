import { Session } from 'meteor/session';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import moment from 'moment';


export const NoteListItem = props => {
  const className = props.note.selected ? 'notes__item notes__item--selected' : 'notes__item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
      props.history.replace(`/dashboard/${props.note._id}`);
    }}>
      <h5 className="notes__item__title text-truncate">{props.note.title || 'Untitled'}</h5>
      <p className="m-0 notes__item__subtitle text-muted">{moment(props.note.updatedAt).format('D.MM.Y')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
};

export default withTracker(props => {
  return { Session };
})(NoteListItem);
