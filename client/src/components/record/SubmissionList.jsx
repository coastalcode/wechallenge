import React from 'react';
import SubmissionEntry from './SubmissionEntry';

export default class SubmissionList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    return (
      <div>
        Current Winner! { this.props.submissions[0].measurement } { this.props.record.units }
        { this.props.submissions.map((submission) => {
          return (<SubmissionEntry
            currentUser={ this.props.currentUser }
            key={ submission.id }
            submission={ submission }
            record={ this.props.record }
            cid={ this.props.cid }/>)
        })}
        <br/>
      </div>
    )
  }
}

