import React from 'react';
import VoteVideoEntry from './VoteVideoEntry';

export default class VideoList extends React.Component {
  constructor(props){
    super(props)
    console.log('hi Votes', this.props)
  }

  render() {
    return(
      <div>
        <h2>Videos that you voted for</h2>
        { this.props.data.map((sub, i)=>{
          return <VoteVideoEntry key={i} data={sub} />
        })}
      </div>

    )
  }
}