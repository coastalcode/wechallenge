import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '' };
  }

  render() {
    return (
      <div>
      <center>
        Search:
        <input
          onChange={ event => this.props.updateSearchTerm(event.target.value) } />
      </center>
      </div>
    )
  }
}



