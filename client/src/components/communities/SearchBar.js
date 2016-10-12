import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="allrecords-searchbar">
        Search:
        <br/>
        <input
          onChange={ event => this.props.updateSearchTerm(event.target.value) } />
      </div>
    )
  }
}