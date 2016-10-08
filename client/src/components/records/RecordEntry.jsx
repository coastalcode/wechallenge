import React from 'react';
import { Link } from 'react-router';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let path = `/record?id=${ this.props.submission.RecordId }`
    return (
        this.props.submission.official > -1 &&
        this.props.checkForMatching([
          this.props.submission.title,
          this.props.submission.description,
          this.props.submission.Record.category,
          this.props.submission.Record.subcategory ],
          this.props.search) &&
        this.props.checkForMatching([
          this.props.submission.state],
          this.props.searchRegion)) ?

    ( <div className="recordList-entry">
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
      <br/>
      { this.props.submission.Record.category }
      { this.props.submission.Record.subcategory }
    </div> )
    : null
  }
}
