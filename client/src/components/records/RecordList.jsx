import React from 'react';
import RecordEntry from './RecordEntry';

export default class RecordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyShowing : this.props.submissions.slice(0, 5),
      index: 0
    }
  }

  selectSubmissions(index) {
    console.log("this is the index we're using", index)
    console.log(this.props.submissions)
    let currentlyShowing = this.props.submissions.slice(index, index + 5);
    this.setState({ currentlyShowing });
    this.setState({ index })
  }


  componentDidMount() {
    this.selectSubmissions(this.state.index);
  }

  render() {
    console.log("inside render:", this.props.submissions)
    return (
      <div className="recordList">
        { this.state.currentlyShowing.map((submission) => {
          return (<RecordEntry key={ submission.id }
            submission={ submission }
            checkForMatching={ this.props.checkForMatching }
            search={ this.props.search }
            searchRegion = { this.props.searchRegion }/>)
        })}
        <br/>
        {
          (this.state.index > 0) ?
          <button onClick={ event => this.selectSubmissions(this.state.index - 5) }>Prev!</button> : null
        }
        {
          (this.state.index < this.props.submissions.length) ?
          <button onClick={ event => this.selectSubmissions(this.state.index + 5) }>Next!</button> : null
        }
      </div>
    )
  }
}
