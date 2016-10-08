import React from 'react';
import CommentView from './CommentView';
import { Link } from 'react-router';

export default class SubmissonEntryInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultView: true
    };
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={ event => this.setState({ defaultView: true }) }>Default View</button>
          <button onClick={ event => this.setState({ defaultView: false }) }>Comment View</button>
        </div>
        { (this.state.defaultView) ?
          <div>
            { this.props.submission.title } <br/>
            { this.props.submission.description } <br/>
            { this.props.submission.measurement } { this.props.record.units }
          </div>
          :
          <div>
            <CommentView
              currentUser={ this.props.currentUser }
              submission={ this.props.submission }/>
          </div>
        }
      </div>
    )
  }
}