import React from 'react';
import { Link } from 'react-router';

export default class UserPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPic: null
    };
  }

  fetchUserPic(id) {
    fetch('/images/' + id)
      .then(data=>data.json())
      .then((image)=>{
        if (image) {
          this.setState({userPic: image.json})
        }
      })
  }

  componentWillMount() {
      this.fetchUserPic(this.props.user);
  }

  render() {
    let profile = `/profile?uid=${this.props.user}`
    return (
      <Link to={ profile }>
      <div className="videolist-userFlex">
        { this.state.userPic ?
          <span className="videolist-userpic" style={{ backgroundImage: 'url(' + this.state.userPic + ')'}}></span>
          : null
        }
        <span className="videolist-username"> {this.props.username}</span>
      </div>
      </Link>
    )
  }

}