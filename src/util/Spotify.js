const clientId = 'b8ddbb4f11c5408ba668224584b35ff1';
const redirectURI = 'http://localhost:3000/';
let accessToken;

const Spotify = {

  getAccessToken() {
    //console.log('Window Location: ' + window.location.href);
    if (accessToken) {
      return accessToken;
    } else {
      // Check the URL for the token and expiry time
      if (window.location.href.match(/access_token=([^&]*)/) &&
          window.location.href.match(/expires_in=([^&]*)/))  {
            // Expire token after expire time
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            const expiresIn = Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
          } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          }
    }
  },

  search(term) {
    // get user access token
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed - Could not get access token!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        ))
      } else {
        return []
      }}
    )
  },

// Save playlist and tracks to Spotify account
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return '';
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    // Get current user profile
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed - Could not get profile!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        console.log('jsonResponse UserId: ' + jsonResponse);
        userId = jsonResponse.id;

        // Create playlist on user account
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Request failed - Could not create playlist!');
          }, networkError => {
            console.log(networkError.message);
          }).then(jsonResponse => {
            console.log('Playlist Id: '+ jsonResponse.id);
            const playlistId = jsonResponse.id;

            // Add tracks to the playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURIs})
            }).then(response => {
              if (response.ok) {
                return response.json()
              }
              throw new Error('Request failed - Could not get tracks!');
              }, networkError => {
                console.log(networkError.message);
              })
          })
        })
    } // end of save playlist

} // end of Spotify

export default Spotify;
