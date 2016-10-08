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
    fetch(`/comments/${ this.props.submission.id }`)
      .then((comments)=> comments.json())
      .then((comments)=>{
        this.setState({ comments });
    })
  }

  postComment(comment) {
    return fetch('/comments/', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(comment)
    })
  }

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    let switchView = () => { this.setState({ listView: true }) }
    return (
      <div className="commentList">
        <button onClick={ event => this.setState({ listView: true }) }>List View</button>
        <button onClick={ event => this.setState({ listView: false }) }>Add Comment View</button>

        { ( this.state.listView ) ?
          <CommentList
            currentUser={ this.props.currentUser }
            comments={ this.state.comments }
            fetchComments={ this.fetchComments.bind(this) }
          />
        :
          <CommentAdd
            currentUser={ this.props.currentUser }
            submission={ this.props.submission }
            fetchComments={ this.fetchComments.bind(this) }
            postComment={ this.postComment.bind(this) }
            switchView={ switchView.bind(this) }
          />
        }

      </div>
    )
  }
}