import React from 'react';
import './SearchResults.css';
import TrackList from '../tracklist/TrackList';

class SearchResults extends React.Component {
  render() {
    console.log('SearchResults - props:' + this.props);
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
