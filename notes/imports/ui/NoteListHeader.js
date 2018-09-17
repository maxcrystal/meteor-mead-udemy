import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'reactstrap';


export class NoteListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: Session.get('searchString'),
    }
  }

  handleSearchBarChange(e) {
    const searchString = e.target.value;
    Session.set('searchString', searchString);
    this.setState({searchString});
  };

  render() {
    return (
      <div className="d-flex flex-column mt-3 px-3">
        <Button color="primary" onClick={() => this.props.meteorCall('notes.insert', (err, res) => {
          if (res) {
            this.props.Session.set('selectedNoteId', res);
            this.props.history.push(`/dashboard/${res}`);
          }
        })}>Create Note</Button>
        <Input className="mt-1 search-bar" placeholder="Search..." onChange={this.handleSearchBarChange.bind(this)} value={this.state.searchString}/>
      </div>
    );
  }
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object,
};

export default withTracker(props => {
  return {
    meteorCall: Meteor.call,
    Session,
  };
})(withRouter(NoteListHeader));
