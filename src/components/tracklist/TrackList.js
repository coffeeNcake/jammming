import React from 'react';
import './TrackList.css';
import Track from '../track/Track';

class TrackList extends React.Component {
  render() {
    console.log('Here are your props: ' +this.props);
    return (
      <div className="TrackList">
          {
            this.props.tracks.map(track => {
              return <Track track={track}
                            key={track.id}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove} />
            })
          }
      </div>
    );
  }
}

export default TrackList;
