import React from 'react';
import './Track.css';

const track = {
  title: 'R.e.d.m',
  artist: 'VHS Dreams',
  album: 'Trans AM'
};

class Track extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    if(this.props.trackActionSymbol === '+'){
      this.props.trackAction(this.props.track);
    }
    else if(this.props.trackActionSymbol === '-'){
      this.props.trackAction(this.props.index);
    }
    e.preventDefault();
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleClick}>{this.props.trackActionSymbol}</a>
      </div>
    );
  }
}

export default Track;
