import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
    e.preventDefault();
  }

  render(){
    return(
      <div className="Playlist">
        <input defaultValue='New Playlist' onChange={this.handleNameChange}/>
        <TrackList trackActionSymbol="-" tracks={this.props.tracks} trackAction={this.props.trackAction}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
