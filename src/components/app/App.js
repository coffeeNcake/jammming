import React, { Component } from 'react';
import './App.css';
import SearchBar from '../searchbar/SearchBar';
import SearchResults from '../searchresults/SearchResults';
import Playlist from '../playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    // Assign initial value
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    console.log('App - props: ' + this.props);

    // Bind the current values
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Add a song to playlist
  addTrack(track) {
    const currentTracks = this.state.playlistTracks;
    const currentTrackIds = this.state.playlistTracks.map(track => track.id);
    const isOnPlaylist = currentTrackIds.includes(track.id);
    // console.log('isOnPlaylist: ' + isOnPlaylist);

    if (!isOnPlaylist) {
      currentTracks.push(track);
      this.setState({playlistTracks: currentTracks});
    }
  }

  // Remove a song from playlist
  removeTrack(track) {
    let currentTracks = this.state.playlistTracks;
    currentTracks = currentTracks.filter(currentTrack =>
      currentTrack.id !== track.id);
    this.setState({playlistTracks: currentTracks});
  }

  // Update playlist name
  updatePlaylistName(name) {
    console.log('UpdatePlaylistName');
    this.setState({playlistName: name});
  }

  // Save playlist and reset playlist name and tracks
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        //playlistTracks: [],
        searchResults: []
      });
    });
  }

  // Search for value based on user input
  // returns search results
  search(term) {
    console.log('Searching for: ' + term);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
