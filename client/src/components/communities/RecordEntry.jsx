import React from 'react';
import { Link } from 'react-router';

export default class RecordEntry extends React.Component {
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
    let path = `/record?id=${ this.props.submission.RecordId }`
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
      Created at: { this.props.submission.createdAt }
    </div>) : null
  }
}
