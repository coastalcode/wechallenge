import React from 'react';
import MainSubmission from './MainSubmission';
import OtherSubmissionsList from './OtherSubmissionsList';

export default class SubmissionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyShown: 0
    }
  }

  setMainVideo(id) {
    this.setState({currentlyShown: id})
  }

  componentDidMount() {
  }

  render() {
    console.log("submissions", this.props.submissions)
    return (
      <div>
        { (this.props.submissions[0]) ? <div> Current Winner! { this.props.submissions[0].measurement } { this.props.record.units } </div> : null }


        { (this.props.submissions[0]) ? <MainSubmission
          currentUser={ this.props.currentUser }
          submission={ this.props.submissions[this.state.currentlyShown] }
          record={ this.props.record }
          cid={ this.props.cid }
        /> : null }

        <OtherSubmissionsList
          submissions={ this.props.submissions }
          setMainVideo={ this.setMainVideo.bind(this) }
        />
      </div>
    )
  }
}

// this.props.submissions.map((submission) => {
//           return (<MainSubmission
//             currentUser={ this.props.currentUser }
//             key={ submission.id }
//             submission={ submission }
//             record={ this.props.record }
//             cid={ this.props.cid }/>)
//         })
