import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


export default class LinksListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true,
    }
  }

  componentDidMount() {
    Session.set({'showVisible': true});
    this.checkboxTracker = Tracker.autorun(() => {
      this.setState({showVisible: Session.get('showVisible')});
    });
  }

  componentWillUnmount() {
    this.checkboxTracker.stop();
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={e => Session.set('showVisible', !e.target.checked)}/>
          show hidden text
        </label>
      </div>
    );
  }
}
