import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.selected = false;
    this.state.submittedLink = '';
    this.state.invalidLink = false;
  }

  componentWillUnmount() {
    window.location.reload();
  }

  createRecord(data) {
    let obj = {
      link: data.id,
      title: data.snippet.title,
      description: data.snippet.description
    };
    if (data.snippet.tags && data.snippet.tags.length > 0) {
      obj.tag = data.snippet.tags.join(' ')
    }
    if (obj.description.length > 255) {
      obj.description = obj.description.slice(0, 252) + '...'
    }
    let init = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    }

    fetch('/submissions', init).then((res)=>{
      console.log('video added', res)
    })
  }

  parseYouTubeLink() {
    let vId, cId = 'AIzaSyDWcljnywJgNj3b7BWlCP6m3Hz3eqYKdMU'
    let input = document.getElementById('submittedLink').value;
    if (input.includes('watch')) {
      let idx = input.indexOf('=') + 1;
      vId = input.slice(idx)
    }
    let init = {
      method: 'GET',
      headers: new Headers()
    }
    let yturl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + vId + '&key=' + cId
    let jpromise = fetch(yturl, init).then(res => res.json())
    jpromise.then((data) => {
      if (data.items.length === 0) {
        this.setState({invalidLink: true})
      } else {
        // accept
        console.log('valid youtube link', data)
        this.createRecord(data.items[0])
      }
    })
  }

  selectCategory(category, subCategory) {
    this.setState({selected: true});
    console.log('category: ', category);
    console.log('sub category: ', subCategory);
    $('#selectedCategory').text(category);
    $('#selectedSubCategory').text(subCategory);
  }

  render() {
    return (
      <div>
        <h1>Submit a Challenge</h1>
        <h3>Select a Category</h3>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                Art
              </h4>
            </div>
            <div id="collapse1" className="panel-collapse collapse">
              <div className="panel-body" className="list-group">
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Art','Drawing')}>Drawing</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Art','Sculptures')}>Sculptures</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Art','Origami')}>Origami</button>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                Computers
              </h4>
            </div>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body" className="list-group">
                 <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Computers','Typing')}>Typing</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Computers','Speed')}>Speed</button>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                Exercise
              </h4>
            </div>
            <div id="collapse3" className="panel-collapse collapse">
              <div className="panel-body" className="list-group">
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Exercise','Pushups')}>Pushups</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Exercise','Situps')}>Situps</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Exercise','Pullups')}>Pullups</button>
                <button type="button" className="list-group-item btn-xs" onClick={this.selectCategory.bind(this,'Exercise','Handstand')}>Handstand time</button>
              </div>
            </div>
          </div>
        </div>

        <h4>Selected Category: &nbsp;
          <span id="selectedCategory"></span>
          { this.state.selected ? '/' : null}
          <span id="selectedSubCategory"></span>
        </h4>

        <span id="signinButton" className="pre-sign-in">
          {/*<!-- IMPORTANT: Replace the value of the <code>data-clientid</code>
               attribute in the following tag with your project's client ID. -->*/}
          <span
            className="g-signin"
            data-callback="signinCallback"
            data-clientid="909357984704-5rs2lm82uopdd1d94l8v34thi31mnc2e.apps.googleusercontent.com"
            data-cookiepolicy="single_host_origin"
            data-scope="https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube">
          </span>
        </span>

        <div className="post-sign-in">
          <div className="channel-container">
            <img className="channel-thumbnail" id="channel-thumbnail" />
            <span id="channel-name"></span>
          </div>

          <div>
            <label htmlFor="title">Title:</label>
            <input id="title" type="text"/>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description"></textarea>
          </div>
          <div>
            <label for="measurement">Measurement:</label>
            <input id="measurement" type="text" />
          </div>
          <div>
            <label for="units">Units:</label>
            <input id="units" type="text" />
          </div>
          <div>
            <label for="measurement-direction">Is a lower or higher measurment impressive?</label>
            <select id="measurement-direction">
              <option>lower</option>
              <option>higher</option>
            </select>
          </div>
          <div>
            <label for="privacy-status">Privacy Status:</label>
            <select id="privacy-status">
              <option>public</option>
              <option>unlisted</option>
              <option>private</option>
            </select>
          </div>

          <div className="submission-flexboxCol">
            <input type="file" id="file" className="button" accept="video/*" />
            <button id="button">Upload Video</button>
            <br/>
            <p>or</p>
            <p className="flexbox-container--column">
              <input placeholder="Add existing YouTube link" type="text" id="submittedLink" className="button" />
              { this.state.invalidLink ?
                <span className="submission-warning">Please enter a valid YouTube Link</span>
                : null
              }
              <button onClick={this.parseYouTubeLink.bind(this)} id="linkButton">Submit a YouTube link</button>
            </p>
            <div className="during-upload">
              <p><span id="percent-transferred"></span>% done (<span id="bytes-transferred"></span>/<span id="total-bytes"></span> bytes)</p>
             <progress id="upload-progress" max="1" value="0"></progress>
           </div>

            <div className="post-upload">
             <p>Uploaded video with id <span id="video-id"></span>. Polling for status...</p>
              <ul id="post-upload-status"></ul>
              <div id="player"></div>
            </div>
            <p id="disclaimer">By uploading a video, you certify that you own all rights to the content or that you are authorized by the owner to make the content publicly available on YouTube, and that it otherwise complies with the YouTube Terms of Service located at <a href="http://www.youtube.com/t/terms" target="_blank">http://www.youtube.com/t/terms</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default scriptLoader('https://apis.google.com/js/client:plusone.js')(Submission);