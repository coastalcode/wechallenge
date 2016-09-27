import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'

class Submission extends Component {

  componentWillUnmount() {
    window.location.reload();
  }


  selectCategory(category, subCategory) {
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

        <h4>Selected Category: <span id="selectedCategory"></span> / <span id="selectedSubCategory"></span></h4>

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
          <div>
            <img id="channel-thumbnail" />
            <span id="channel-name"></span>
          </div>

          <div>
            <label for="title">Title:</label>
            <input id="title" type="text"/>
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea id="description"></textarea>
          </div>
          <div>
            <label for="privacy-status">Privacy Status:</label>
            <select id="privacy-status">
              <option>public</option>
              <option>unlisted</option>
              <option>private</option>
            </select>
          </div>

          <div>
            <input input type="file" id="file" className="button" accept="video/*" />
            <button id="button">Upload Video</button>

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