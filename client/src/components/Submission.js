import React, { Component } from 'react';

export default class Submission extends Component {
  render() {

    return (
      <div>
        <h1>Hello from Submit Challenge Page!!!</h1>

        <span id="signinButton" class="pre-sign-in">
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
            <input id="title" type="text" value="Default Title" />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea id="description">Default description</textarea>
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