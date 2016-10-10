import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

export default class VideoEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.view = 'normal'
  }

  render() {

    return (
      <div>
        {this.state.view === 'normal' ?
        <div>
          <div className="row flagged-row">

            <div className="col-sm-5">

                <Link to={`/record?rid=${this.props.data.Submission.RecordId}`}>

                <img className="img-responsive" src={ "http://img.youtube.com/vi/" + this.props.data.Submission.link + "/hqdefault.jpg" }/>
                </Link>

            </div>

            <div className="col-sm-4">
              <label>Title: </label>
              { this.props.data.Submission.title }
              <label>Category / Subcategory:</label>
              { `${this.props.data.Submission.Record.category} / ${this.props.data.Submission.Record.subcategory}` }
              <label>Measurment:</label>
              {`${this.props.data.Submission.measurement} ${this.props.data.Submission.Record.units}`}
            </div>

            <div className="col-sm-3">
              <div className="btn-group-vertical">
                <Link to={`/record?rid=${this.props.data.Submission.RecordId}`}><button className="btn btn-primary profileButton">Go to Record Page</button></Link>
              </div>
            </div>
          </div>

        </div> : null }

      </div>
    )
  }
}