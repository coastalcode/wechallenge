import React from 'react';
import { Link } from 'react-router';
import UserPic from './../home/UserPic';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let path;
    console.log(this.props.index)

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
        <div className="title">{ this.props.submission.title }</div>
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
          { this.props.submission.Record.category } | 
          { this.props.submission.Record.subcategory }
          <UserPic user={ this.props.submission.User.id } username={ this.props.submission.User.username }/>
          <div className="uploaddate">Uploaded on: { moment(this.props.submission.createdAt).format("MM-DD-YYYY") }</div>
        </div>

      </div>

    </Link> )
    : null
  }
}
