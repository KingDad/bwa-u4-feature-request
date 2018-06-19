const clientId = '8db4986109384a0c88a318860cc68dc8';
const redirectURI = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
  getAccessToken(){
    if (accessToken){
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiresInMatch){
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else{
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=playlist-modify-private%20playlist-modify-public&response_type=token`;
      window.location = authorizeUrl;
    }
  },

  search(searchTerm){
    const accessToken = Spotify.getAccessToken();
    if (searchTerm) {return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  }
  },

  savePlaylist(playlistName, playlistTracks){
    if (!playlistName || !playlistTracks){
      return ;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID = ``;
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse =>{
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
    ).then(jsonResponse => {
      const playlistID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: playlistTracks})
      });
    })
    });
  }
};

export default Spotify;
