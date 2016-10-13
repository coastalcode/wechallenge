import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '' };
  }

  render() {
    return (
      <div className="allrecords-searchbar">
        <input
          onChange={ event => this.props.updateSearchTerm(event.target.value) } />
      </div>
    )
  }
}



