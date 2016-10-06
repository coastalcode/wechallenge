import React from 'react';
import RecordEntry from './RecordEntry';

export default class RecordList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("RecordList successfully mounted!")
  }

  render() {
    console.log("record list submissions", this.props.submissions)
    return (
      <div className="recordList">
        { this.props.submissions.map((submission) => {
          return (<RecordEntry key={ submission.id }
            submission={ submission }
            checkForMatching={ this.props.checkForMatching }
            search={ this.props.search }
            searchRegion = { this.props.searchRegion }/>)
        })}
        <br/>
      </div>
    )
  }
}
