import React from 'react';
import CRecordEntry from './CRecordEntry';

export default class CRecordList extends React.Component {
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
          return (<CRecordEntry key={ submission.id }
            cid={ this.props.cid }
            submission={ submission }
            checkForMatching={ this.props.checkForMatching }
            search={ this.props.search }/>)
        })}
        <br/>
      </div>
    )
  }
}
