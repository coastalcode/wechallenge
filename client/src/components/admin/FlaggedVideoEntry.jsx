import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.state.showDeleteModal = false;
    this.state.view = 'normal';
  }

  showDeleteModal() {
    this.setState({ showDeleteModal: true });
  }

  hideDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  deleteSubmission () {
    console.log(this.props.flag.id)
    let init = {
      method: 'DELETE'
    }

    fetch(`/submissions/${ this.props.flag.id }`, init)
      .then((removed)=>{
        console.log(this.props.flag.id);
        console.log("Bye!!");
        this.hideDeleteModal();
        this.setState({view: 'deleted'});
    })
  }

  toggleFlagVideo () {
    console.log(this.props.flag.id)

    fetch(`/submissions/flag/${ this.props.flag.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!");
        this.setState({view: 'unflagged'});
    })
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.flag.link }`
    return (
      <div>
        {this.state.view === 'normal' ?
        <div>
          <div className="row flagged-row">
            <div className="col-sm-5">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="col-sm-5" src={ url } frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>

            <div className="col-sm-4">
              <label>Title: </label>
              { this.props.flag.title }
              <label>Category / Subcategory:</label>
              { `${this.props.flag.Record.category} / ${this.props.flag.Record.subcategory}` }
              <label>Measurment:</label>
              {`${this.props.flag.measurement} ${this.props.flag.Record.units}`}
            </div>

            <div className="col-sm-3">
              <div className="btn-group-vertical">
                <button className="btn btn-success" onClick={event=>{ this.toggleFlagVideo()  }} >Unflag this video</button>
                <button className="btn btn-danger" onClick={this.showDeleteModal.bind(this)} >Remove this video</button>
                <Link to={`/record?id=${this.props.flag.RecordId}`}><button className="btn btn-primary" onClick={this.showDeleteModal.bind(this)} >Go to Record Page</button></Link>
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
