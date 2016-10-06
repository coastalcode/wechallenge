import React from 'react';
import { Link } from 'react-router';

export default class CRecordEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchingRecord : {}
    }
  }

  fetchMatchingRecord() {
    fetch(`/records/${ this.props.submission.RecordId }`)
      .then((matchingRecord)=> matchingRecord.json())
      .then((matchingRecord)=>{
        this.setState({ matchingRecord });
    })
  }

  componentDidMount() {
    console.log("Mounted!!!")
    this.fetchMatchingRecord()
  }

  render() {
    let path = `/communityrecord?rid=${ this.props.submission.RecordId }&cid=${ this.props.cid }`
    return (this.props.submission.official > -1 && this.props.checkForMatching([this.props.submission.title, this.props.submission.description, this.state.matchingRecord.category, this.state.matchingRecord.subcategory], this.props.search)) ? (
      <div className="recordList-entry">
      { this.props.submission.title }
      <br/>
      <Link to={ path }>
        <img className="videolist-thumb"
          src={ "http://img.youtube.com/vi/" + this.props.submission.link + "/hqdefault.jpg" }/>
      </Link>
      <br/>
      Votes: { this.props.submission.votes }
      <br/>
      Created at: { moment(this.props.submission.createdAt).format("MM-DD-YYYY") }
    </div>) : null
  }
}
