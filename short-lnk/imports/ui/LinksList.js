import React from 'react';
import FlipMove from 'react-flip-move';
import { Meteor } from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

import {Links} from './../api/links.js';
import LinksListItem from './LinksListItem.js';


export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible'),
      }).fetch();
      this.setState({links});
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return <div className="item"><p className="item__status-message">No Links Found</p></div>;
    }

    return this.state.links.map(link => {
      // return <p key={link._id}>{link.url}</p>;
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
    });
  }

  render () {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
