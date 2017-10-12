import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Add track to playlist
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // Remove track from playlist
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  // Display a '+' or '-' to add or remove tracks from playlist
  renderAction() {
    if (this.props.isRemoval) {
      // return '-'  //display - anchor tag
      return <a className="Track-action" onClick={this.removeTrack} > - </a>
    } else {
      // return '+' //display + anchor tag
      return <a className="Track-action" onClick={this.addTrack} > + </a>
    }
  }

  render() {
    return (
      <div className="Track" key={this.props.track.id}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
        { /* <a className="Track-action" onClick={this.addTrack} >{this.renderAction()}</a>*/ }
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
