import React from 'react';
import RecordEntry from './RecordEntry';

export default class RecordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyShowing : [],
      index: 0,
      perPage: 5
      // change this to easily change number shown per page
    }
  }

  selectSubmissions(index) {
    let currentlyShowing = this.props.submissions.slice(index, index + this.state.perPage);
    this.setState({ currentlyShowing });
    this.setState({ index })
  }


  componentDidMount() {
    this.selectSubmissions(this.state.index);
  }

  render() {
    return (
      <div className="recordList">
        { this.state.currentlyShowing.map((submission) =>
          (<RecordEntry key={ submission.id }
            submission={ submission }
            checkForMatching={ this.props.checkForMatching }
            search={ this.props.search }
            searchRegion = { this.props.searchRegion }/>)
        )}
        <br/>
        {
          (this.state.index > 0) ?
          <button onClick={ event => this.selectSubmissions(this.state.index - this.state.perPage) }>Prev!</button> : null
        }
        {
          ((this.state.index + this.state.perPage) < this.props.submissions.length) ?
          <button onClick={ event => this.selectSubmissions(this.state.index + this.state.perPage) }>Next!</button> : null
        }
      </div>
    )
  }
}
