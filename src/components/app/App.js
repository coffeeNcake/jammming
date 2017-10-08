import React, { Component } from 'react';
import './App.css';
import SearchBar from '../searchbar/SearchBar';
import SearchResults from '../searchresults/SearchResults';
import Playlist from '../playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {name: 'Pieces', artist: 'Rob Thomas', album: 'The Great Unknown'},
        {name: 'Hold On Forever', artist: 'Rob Thomas', album: 'The Great Unknown'},
        {name: 'Little Wonders', artist: 'Rob Thomas', album: 'Little Wonders'},
      ]};

    this.state = {
      playlistName: 'Listen N Relax',
      playlistTracks: [
        {name: 'Still Waiting', artist: 'Tom Chaplin', album: 'The Wave'},
        {name: 'Slow Hands', artist: 'Niall Horan', album: 'Slow Hands'}
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Add a song to playlist
  addTrack(track) {
    const isOnPlaylist = this.state.playlistTracks.includes(track.id);
    if (!isOnPlaylist) {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks})
    }
  }

  // Remove a song from playlist
  removeTrack(track) {
    let removeTrackId = track.id;
    const playlistTracks = this.state.playlistTracks;
    playlistTracks.filter(track =>
      this.state.playlistTracks.id !== removeTrackId);
    this.setState({playlistTracks: playlistTracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
