import React from 'react';
import CSubmissionEntry from './CSubmissionEntry';

export default class CSubmissionList extends React.Component {
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
          return (<CSubmissionEntry
            currentUser={ this.props.currentUser }
            key={ submission.id }
            submission={ submission }
            record={ this.props.record }
            cid={ this.props.cid } />)
        })}
        <br/>
      </div>
    )
  }
}

