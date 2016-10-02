import React from 'react';
import VideoEntry from './VideoEntry';

export default class VideoList extends React.Component {
  constructor(props){
    super(props)
    console.log('hi', this.props)
  }

  render() {
    return(
      <div>
        <h2>Challenge Submission History</h2>
        { this.props.data[0].Submissions.map((sub, i)=>{
          return <VideoEntry key={i} data={sub} />
        })}
      </div>

    )
  }
}