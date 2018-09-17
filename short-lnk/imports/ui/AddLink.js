import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';


export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value.trim(),
    });
  }

  onSubmit(e) { 
    const { url } = this.state;
    e.preventDefault();

    // Links.insert({url, userId: Meteor.userId()});
    Meteor.call('links.insert', url, err => {
      if (!err) {
        this.handelModalClose();
      } else {
        this.setState({error: err.reason})
      }
    });
  };

  handelModalClose() {
    this.setState({
      isOpen: false, 
      url: '', 
      error: '',
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add Link" 
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handelModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view__modal">
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handelModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
  
}