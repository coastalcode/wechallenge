import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <center>
        Search:
        <input
          onChange={ event => this.props.updateSearchTerm(event.target.value) } />
        <button>Search</button>
      </center>
      </div>
    )
  }
}