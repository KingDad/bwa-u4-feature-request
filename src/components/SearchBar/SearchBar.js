import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleTermChange(e){
    this.setState({
      term: e.target.value
    });
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
      this.search();
    }
    console.log('Something happened');
  }

  render(){
    return(
      <div className="SearchBar" onKeyUp={this.handleKeyUp}>
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
