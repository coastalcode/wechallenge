import React from 'react';
import CommentList from './CommentList';

export default class Record extends React.Component {
  constructor(props) {
    super(props);

    this.testing = {
      id: 0,
      title: "Best Video in the world",
      link: "https://www.youtube.com/embed/a1Y73sPHKxw",
      description: "This is the best video in the world",
      votes: 0,
      official: 1,
      createdAt: "a minute ago",
      updatedAt: "Never!",
      UserId: 0,
      RecordId: 0
    }

    this.state = {
      first: {},
      other: []
    }
  }

  componentDidMount() {
    console.log("Record successfully mounted!")
  }

  render() {
    return (
      <div>

      <center>
      <div>
        <h3>{ this.testing.title} </h3>
        <iframe width="560" height="315" src={ this.testing.link } frameBorder="0" allowFullScreen></iframe>
        <div>
          { this.testing.description }
          <br/>
          props!!! { this.props.foo }
          <br/>
          upvotes: { this.testing.votes }
          <br/>
          This video was uploaded { this.testing.createdAt } by user { this.testing.UserId }
          <br/>
          <button onClick="">Challenge this record!</button>
        </div>
      </div>
      </center>

        <h3>This is the Record page!</h3>

        <CommentList />
      </div>
    )
  }
}