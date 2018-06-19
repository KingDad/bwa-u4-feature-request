import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack =>
    savedTrack.id === track.id)){
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track])
    });
    console.log(this.state.playlistTracks);
  }

  removeTrack(index){
    let array = this.state.playlistTracks;
    array.splice(index, 1);
    this.setState({
      playlistTracks: array
    });
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  searchSpotify(term){
    if(!term){
      Spotify.getAccessToken();
    }
    if(term){
      Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    if(this.state.playlistName && trackUris){
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
      });
    }
    console.log(trackUris);
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.searchSpotify}/>
        <div className="App-playlist">
          <SearchResults tracks={this.state.searchResults} trackAction={this.addTrack}/>
          <Playlist tracks={this.state.playlistTracks} trackAction={this.removeTrack} playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
