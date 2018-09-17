import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';


export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    
    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      this.timeout = setTimeout(() => this.setState({justCopied: false}), 1000);
    }).on('error', () => {
      alert('Unable to copy automatically');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
    clearTimeout(this.timeout);
  }

  renderStats() {
    let visitedMessage = null
    if (typeof(this.props.lastVisitedAt) === 'number') {
      visitedMessage = `(last ${moment(this.props.lastVisitedAt).fromNow()})`;
    }
    return (
      <p>Visits: {this.props.visitedCount} {visitedMessage}</p>
    );
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <div className="item__message">
          <p>{this.props.shortUrl}</p>
          {this.renderStats()}
        </div>
        <a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">VISIT</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
}