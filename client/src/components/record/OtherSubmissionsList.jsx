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
    let prevwinners = this.props.submissions.filter((submission)=> submission.duration)

    let attempts = this.props.submissions.filter((submission)=> !submission.duration)
    console.log(prevwinners, "prev")
    console.log(attempts, "attempts")
    console.log(this.props.othersubmissions)

    return(
      <div className="othersubslist">


        { (prevwinners.length) ?
          <div>
            <div className="title">
              Previous winners!
            </div>

          { prevwinners.map((submission, subindex)=> <OtherSubmissionsListEntry
            fetchComments={ this.props.fetchComments }
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/>)}

          </div> : null }

        { (attempts.length) ?
          <div>
            <div className="title">
              Other record attempts!
            </div>

          { attempts.map((submission, subindex)=> <OtherSubmissionsListEntry
            fetchComments={ this.props.fetchComments }
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/>)}

          </div> : null }

        { (this.props.othersubmissions) ?
          <div>
            <div className="title">
              Watch other records!
            </div>

          { this.props.othersubmissions.map((submission, subindex)=> <OtherSubmissionsListEntry
            fetchComments={ this.props.fetchComments }
            random={ true }
            submission={ submission }
            subindex={ subindex }
            setMainVideo={ this.props.setMainVideo }/>)}

          </div> : null }

      </div>)
  }
}
