import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList trackActionSymbol="+" tracks={this.props.tracks} trackAction={this.props.trackAction} />
      </div>
    );
  }
}

export default SearchResults;
