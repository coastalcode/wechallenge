import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

export default class VideoEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.view = 'normal'
  }

  showDeleteModal() {
    this.setState({ showDeleteModal: true });
  }

  hideDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  deleteSubmission () {
    console.log(this.props.data.id)
    let init = {
      method: 'DELETE'
    }

    fetch(`/submissions/${ this.props.data.id }`, init)
      .then((removed)=>{
        console.log(this.props.data.id);
        console.log("Bye!!");
        this.hideDeleteModal();
        this.setState({view: 'deleted'});
    })
  }

  render() {

    return (
      <div>
        {this.state.view === 'normal' ?
        <div>
          <div className="row flagged-row">
            <div className="col-sm-5">

                <Link to={`/record?id=${this.props.data.RecordId}`}>

                <img className="img-responsive" src={ "http://img.youtube.com/vi/" + this.props.data.link + "/hqdefault.jpg" }/>
                </Link>

            </div>

            <div className="col-sm-4">
              <label>Title: </label>
              { this.props.data.title }
              <label>Category / Subcategory:</label>
              { `${this.props.data.Record.category} / ${this.props.data.Record.subcategory}` }
              <label>Measurment:</label>
              {`${this.props.data.measurement} ${this.props.data.Record.units}`}
            </div>

            <div className="col-sm-3">
              <div className="btn-group-vertical">
                <Link to={`/record?id=${this.props.data.RecordId}`}><button className="btn btn-primary profileButton" >Go to Record Page</button></Link>

                <Link><button className="btn btn-danger profileButton" onClick={this.showDeleteModal.bind(this)} >Remove this video</button></Link>
                <h1>Hello</h1>
              </div>
            </div>
          </div>



          <Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deleting a Submission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Are you sure you want to delete this submission?</h3>
              <p>All of the content associated to this submission like comments, votes, community comments will also be deleted.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.hideDeleteModal.bind(this)}>Cancel</Button>
              <Button bsStyle="danger" onClick={this.deleteSubmission.bind(this)}>Yes, Delete Submission</Button>
            </Modal.Footer>
          </Modal>
        </div> : null }

      </div>
    )
  }
}