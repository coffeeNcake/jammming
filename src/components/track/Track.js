import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  // Add track to playlist
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // Display a '+' or '-' to add or remove tracks from playlist
  renderAction() {
    if (this.props.isRemoval) {
      return '-'  //display - anchor tag
    } else {
      return '+' //display + anchor tag
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
        <a className="Track-action" onClick={this.addTrack} >{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
