import React from 'react';
import { Link } from 'react-router';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let path;

    if (this.props.cid) {
      path = `/record?rid=${ this.props.submission.RecordId }&cid=${ this.props.cid }`
    } else {
      path = `/record?rid=${ this.props.submission.RecordId }`
    }

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

    ( <Link to={ path }>
        <center>
        <span className="title">{ this.props.submission.title }</span>
        </center>
      <div className="allrecords-recordlist-entry">


        <br/>

        <div>
          <img
            src={ "http://img.youtube.com/vi/" + this.props.submission.link + "/hqdefault.jpg" }/>
        </div>

        <div>
          Votes: { this.props.submission.votes }
          <br/>
          Created at: { moment(this.props.submission.createdAt).format("MM-DD-YYYY") }
          <br/>
          { this.props.submission.Record.category }
          { this.props.submission.Record.subcategory }
        </div>

      </div>

    </Link> )
    : null
  }
}
