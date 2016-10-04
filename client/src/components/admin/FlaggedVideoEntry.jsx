import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.state.showDeleteModal = false;
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
    })
  }

  toggleFlagVideo () {
    console.log(this.props.flag.id)

    fetch(`/submissions/flag/${ this.props.flag.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!")
    })
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.flag.link }`
    return (
      <div>

        { this.props.flag.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <br />
        <button onClick={this.showDeleteModal.bind(this)} >Remove this video</button>
        <button onClick={event=>{ this.toggleFlagVideo()  }} >Unflag this video</button>

        <Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deleting a Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure you want to delete this submission?</h3>
            <p>A all of the content assoicated to this submission like comments, votes, community comments will also be deleted.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideDeleteModal.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteSubmission.bind(this)}>Yes Delete Submission</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}