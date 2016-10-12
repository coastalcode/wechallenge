import React from 'react';
import OtherSubmissionsListEntry from './OtherSubmissionsListEntry';

export default class OtherSubmissionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return(
      <div className="othersubslist">

        <div className="title">
          Previous winners!
        </div>

        { this.props.submissions.map((submission, subindex) => {
          return (submission.duration) ?
          <OtherSubmissionsListEntry
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/> : null
        })}

        <div className="title">
          Record attempts!
        </div>

        { this.props.submissions.map((submission, subindex) => {
          return (!submission.duration) ?
          <OtherSubmissionsListEntry
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/> : null

        })}

        <div className="title">
          Record suggestions!
        </div>

        { this.props.othersubmissions.map((submission, subindex) => {
          return (!submission.duration) ?
          <OtherSubmissionsListEntry
            random={ true }
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/> : null

        })}

      </div>)
  }
}
