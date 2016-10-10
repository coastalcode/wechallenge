import React from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

export default class CommentEntry extends React.Component {
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

  deleteComment () {
    console.log(this.props.data.id)
    let init = {
      method: 'DELETE'
    }

    fetch(`/comments/${ this.props.data.id }`, init)
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

                <Link to={`/record?id=${this.props.data.Submission.RecordId}`}>

                <img className="img-responsive" src={ "http://img.youtube.com/vi/" + this.props.data.Submission.link + "/hqdefault.jpg" }/>
                </Link>

            </div>

            <div className="col-sm-4">
              <label>Comment Title: </label>
              { this.props.data.title }
              <label>Comment Body: </label>
              { this.props.data.description }
              <label>Record Title: </label>
              { this.props.data.Submission.title }
              <label>Category / Subcategory:</label>
              { `${this.props.data.Submission.Record.category} / ${this.props.data.Submission.Record.subcategory}` }
            </div>

            <div className="col-sm-3">
              <div className="btn-group-vertical">
                <Link><button className="btn btn-danger profileButton" onClick={this.showDeleteModal.bind(this)} >Delete this comment</button></Link>
              </div>
            </div>
          </div>

          <Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deleting a Comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3>Are you sure you want to delete this comment?</h3>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.hideDeleteModal.bind(this)}>Cancel</Button>
                <Button bsStyle="danger" onClick={this.deleteComment.bind(this)}>Yes, Delete Comment</Button>
              </Modal.Footer>
            </Modal>
          </div> : null }
      </div>
    )
  }

}

  // render() {
  //   let dateObj = new Date(this.props.data.createdAt);
  //   let path = `/record?id=${ this.props.data.Submission.RecordId }`;
  //   return(
  //     <div className="comments-container--flexbox">
  //       <Link to={path}>
  //         <h3>Record: {this.props.data.Submission.title}</h3>
  //       </Link>
  //       <div>Title: {this.props.data.title}</div>
  //       <div>Comment: {this.props.data.description}</div>
  //       <div>Date: {dateObj.toLocaleString()}</div>
  //     </div>
  //   )
  // }