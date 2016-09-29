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
    return (
      <div className="recordList">
        { this.props.submissions.map((submission) => {
          if (this.props.checkForMatching([submission.title], this.props.search)) {
            return (<RecordEntry key={ submission.id } video={ submission }/>)
          }
        })}
        <br/>
      </div>
    )
  }
}