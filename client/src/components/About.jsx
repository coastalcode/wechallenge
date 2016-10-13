import React, { Component } from 'react';

export default class About extends Component {
  constructor(props) {
    super(props)

    this.users = [
      { name: "Harris Lee",
        picture: "/images/harrislee.png",
        github: "https://github.com/strongharris",
        blurb: "Harris is a man of many talents. In addition to his technical contributions, he never fails to keep the CoastalCode team laughing."
      },
      { name: "John Smalley",
        picture: "/images/johnsmalley.png",
        github: "https://github.com/johnsmalley",
        blurb: "John has infectious enthusiasm for everything he does, and loves CoastalCode (almost) as much as he loves sailing."
      },
      { name: "Jim Yang",
        picture: "/images/jimyang.png",
        github: "https://github.com/sourjam",
        blurb: "Jim provides expert guidance through the team's technical challenges. He can often be found tormenting his teammates with pictures of sandwiches."
      },
      { name: "Anna Zhao",
        picture: "/images/annazhao.png",
        github: "https://github.com/annatangzhao",
        blurb: "Anna made this page you're looking at. Welcome! She also has two cute bunnies and an annoying puppy."
      }];
  }
  render() {
    return (
      <div className="aboutpage">

        <center>
        <a href="https://github.com/coastalcode"><h3>CoastalCode</h3></a>
        <div className="teamProfile">


          { this.users.map((user, index)=>{
              return (
                  <div>
                  <span className="teamProfileName">{ user.name }</span>
                  <br/>
                  <img src={ user.picture }/>
                  <div> { user.blurb } </div>
                  <a href={ user.github }><span>
                      <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                  </span></a>
                  </div>
              )
          }) }
        </div>
        </center>
      </div>
    )
  }
}