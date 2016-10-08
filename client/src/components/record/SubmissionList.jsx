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
        { this.props.submissions.map((submission) => {
          return (<SubmissionEntry
            currentUser={ this.props.currentUser }
            key={ submission.id }
            submission={ submission }
            record={ this.props.record }/>)
        })}
        <br/>
      </div>
    )
  }
}

