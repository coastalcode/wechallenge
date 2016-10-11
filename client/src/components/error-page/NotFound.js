import React, { Component } from 'react';

export default class NotFound extends Component {
  constructor(props) {
    super(props)

    this.users = [
      { name: "Harris Lee",
        picture: "",
        github: "https://www.google.com"
      },
      { name: "John Smalley",
        picture: "",
        github: "https://www.google.com"
      },
      { name: "Jim Yang",
        picture: "",
        github: "https://www.google.com"
      },
      { name: "Anna Zhao",
        picture: "",
        github: "https://www.google.com"
      }];
  }
  render() {
    return (
      <center>
      <div className="teamProfile">
        <h1>Oh no! The page you are looking for is not found.</h1>
        <br/>
        While you're here, check out the team behind the app!

        <a href="https://github.com/coastalcode"><h3>CoastalCode</h3></a>

        { this.users.map((user, index)=>{
            return (
                <div>
                <span className="teamProfileName">{ user.name }</span>
                <br/>
                <img src="https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg"/>
                <br/>
                <span>Here's a blurb about this person and why they're awesome</span>
                <br/>
                <a href={ user.github }><span>
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </span></a>
                </div>
            )
        }) }
      </div>
      </center>
    )
  }
}