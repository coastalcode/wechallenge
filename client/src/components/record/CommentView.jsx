import React from 'react';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';

export default class CommentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      listView: true
    }
  }

  fetchComments() {
    let fetchPath;
    if (this.props.cid) {
      fetchPath = `/communities/comments?sid=${ this.props.submission.id }&cid=${ this.props.cid }`
    } else {
      fetchPath = `/comments/${ this.props.submission.id }`
    }
    fetch(fetchPath)
      .then((comments)=> comments.json())
      .then((comments)=>{
        this.setState({ comments });
    })
  }

  postComment(comment) {
    let fetchPath;
    if (this.props.cid) {
      fetchPath = '/communities/comments'
    } else {
      fetchPath = '/comments/'
    }
    return fetch(fetchPath, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(comment)
    })
    .then((comment)=> {this.fetchComments()})
  }

  componentWillMount() {
    this.props.fetchComments(this.props.submission.id);
  }

  render() {
    let switchView = () => { this.setState({ listView: true }) }
    return (
      <div>
        <CommentList
          submission={ this.props.submission }
          currentUser={ this.props.currentUser }
          comments={ this.props.comments }
          fetchComments={ this.fetchComments.bind(this) }
        />

        <CommentAdd
          cid={ this.props.cid }
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }
          fetchComments={ this.props.fetchComments }
          postComment={ this.postComment.bind(this) }
        />


      </div>
    )
  }
}