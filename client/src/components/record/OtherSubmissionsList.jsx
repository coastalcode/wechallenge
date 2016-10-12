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
        <br/>
        { this.props.submissions.map((submission, subindex) => {
          return (submission.duration) ?
          <OtherSubmissionsListEntry
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/> : null
        })}

        <br/>
        <br/>

        <div className="title">
          Record attempts!
        </div>

        <br/>
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

        <br/>
        { this.props.submissions.map((submission, subindex) => {
          return (!submission.duration) ?
          <OtherSubmissionsListEntry
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/> : null

        })}

      </div>)
  }
}
