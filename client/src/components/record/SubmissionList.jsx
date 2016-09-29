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
        <h2>{ this.props.record.title }</h2>
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

