import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component{
  render(){
    let i = -1;
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track =>{
            i++;
            return <Track track={track} key={track.id} trackActionSymbol={this.props.trackActionSymbol} trackAction={this.props.trackAction} index={i}/>
          })
        }
      </div>
    );
  }
}

export default TrackList;
