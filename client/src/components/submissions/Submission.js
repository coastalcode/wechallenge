import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import CategoryList from './CategoryList';
import UploadToYoutube from './UploadToYoutube';

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.selected = false;
    this.state.submittedLink = '';
    this.state.invalidLink = false;
    this.state.authenticated = false;
    this.state.submitLocation;
    this.state.communities = [];
    this.state.userId;
    this.state.submitCommunity = false;
    this.state.submitUploadOption;
  }

  // no longer needed as pulling in upload scrip from a different component
  componentWillUnmount() {
    window.location.reload();
  }

  // confirms that the user is authenticate to use this page
  componentWillMount() {
    const token = localStorage.getItem('token');

    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        if(token === currentUser.test) {
          this.setState({authenticated: true, userId: currentUser.id});
          fetch(`/communities/${ currentUser.id }`)
          .then((communities) => communities.json())
          .then((communities) => this.setState({communities}))
        }
      })
  }

  createRecord(data) {
    if ($('#measurement-direction').val() === 'lower') {
      var moreisgood = 0;
      var lessisgood = 1;
    } else {
      var moreisgood = 1;
      var lessisgood = 0;
    }

    if ($('#check_public').is(":checked")) {
      var isPublic = 0;
    } else {
      var isPublic = 1;
    }

    let obj = {
      link: data.id,
      title: data.snippet.title,
      description: data.snippet.description,
      userId: Number(localStorage.user),
      selectedCategory: $('#selectedCategory').text(),
      selectedSubCategory: $('#selectedSubCategory').text(),
      measurement: $('#measurement').val(),
      units: $('#units').val(),
      moreisgood: moreisgood,
      lessisgood: lessisgood,
      CommunityId: $('input[name=community]:checked').val(),
      public: isPublic
    };
    if(localStorage.region) {
      obj.state = localStorage.region;
    }

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
      browserHistory.push('/');
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

  submitLocation(location) {
    console.log('site only checked');
    if (location === 'communityOnly') {
      this.setState({
        submitLocation: location,
        submitCommunity: false,
        submitUploadOption: false
      });
    } else if (location === 'siteOnly') {
      this.setState({
        submitLocation: location,
        submitCommunity: true,
        submitUploadOption: false
      });
    }
  }

  renderSubmitCommunity () {
    if (this.state.submitLocation === 'communityOnly') {
      console.log('communities: ', this.state.communities[0]);
      console.log('communities.length: ', this.state.communities.length);
      return (
        <div>
          <h3>What community do you want to submit to?</h3>
              {this.state.communities.length === 0 ?
                <p>You currently are not a member of any communities, please select "Entire Site"</p> :
                this.state.communities.map((community) => {
                  return (
                    <label className="radio-inline">
                      <input onClick={this.submitCommunity.bind(this, community.Community.id)} type="radio" name="community" value={community.Community.id} id={community.Community.id} />{community.Community.name}
                    </label>
                  )
                })
              }
          <div class="checkbox">
            <label><input type="checkbox" id="check_public" defaultChecked={false}/>Make my submission private to my community only</label>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  submitCommunity(community) {
    console.log('inside submit community');
    this.setState({
      submitCommunity: community,
      submitUploadOption: false
    });
  }

  renderSubmitUploadOption() {
    if (this.state.submitCommunity) {
      return (
        <div>
          <h3>How would you like to submit your video?</h3>
          <p>There are two options:</p>
          <form>
            <div className="radio">
              <label><input onClick={this.submitUploadOption.bind(this,'youtube')} type="radio" name="upload" value="youtube" id="youtube" />Upload a video to your YouTube acount</label>
            </div>
            <div className="radio">
              <label><input onClick={this.submitUploadOption.bind(this,'url')} type="radio" name="upload" value="url" id="url" />Submit an already existing YouTube url</label>
            </div>
          </form>
        </div>
      )
    } else {
      return null
    }
  }

  submitUploadOption(option) {
    console.log('inside submit upload option');
    this.setState({submitUploadOption: option});
  }

  renderPick

  renderSubmitUpload() {
    if (this.state.submitUploadOption === 'youtube') {
      return (
        <div>

          <h3 className="pre-sign-in">Please signin to your google account</h3>
          <UploadToYoutube />
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
            <h3>Now that you are signed into YouTube, please fill out the following information</h3>

            <CategoryList selectCategory={this.selectCategory.bind(this)} />

            <h4>Selected Category: &nbsp;
              <span id="selectedCategory"></span>
              { this.state.selected ? '  /  ' : null}
              <span id="selectedSubCategory"></span>
            </h4>

            <div>
              <label htmlFor="title">Title:</label>
              <input id="title" type="text"/>
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea id="description"></textarea>
            </div>
            <div>
              <label htmlFor="measurement">Measurement:</label>
              <input id="measurement" type="text" />
            </div>
            <div>
              <label htmlFor="units">Units:</label>
              <input id="units" type="text" />
            </div>
            <div>
              <label htmlFor="measurement-direction">Is a lower or higher measurment impressive?</label>
              <select id="measurement-direction">
                <option>lower</option>
                <option>higher</option>
              </select>
            </div>
            <div>
              <label htmlFor="privacy-status">YouTube Privacy Status:</label>
              <select id="privacy-status">
                <option>public</option>
                <option>unlisted</option>
                <option>private</option>
              </select>
            </div>

            <div className="submission-flexboxCol">
              <input type="file" id="file" className="button" accept="video/*" />
              <button id="button">Upload Submission</button>
              <p id="disclaimer">By uploading a video, you certify that you own all rights to the content or that you are authorized by the owner to make the content publicly available on YouTube, and that it otherwise complies with the YouTube Terms of Service located at <a href="http://www.youtube.com/t/terms" target="_blank">http://www.youtube.com/t/terms</a></p>
              <br/>
              <div className="during-upload">
                <p><span id="percent-transferred"></span>% done (<span id="bytes-transferred"></span>/<span id="total-bytes"></span> bytes)</p>
               <progress id="upload-progress" max="1" value="0"></progress>
             </div>

              <div className="post-upload">
               <p>Uploaded video with id <span id="video-id"></span>. Polling for status...</p>
                <ul id="post-upload-status"></ul>
                <div id="player"></div>
              </div>
            </div>
          </div>

        </div>
      )
    } else if (this.state.submitUploadOption === 'url') {
      return (
        <div>
          <h3>You will be submitting an existing YouTube url, please fill out the following information</h3>

          <CategoryList selectCategory={this.selectCategory.bind(this)} />

          <h4>Selected Category: &nbsp;
            <span id="selectedCategory"></span>
            { this.state.selected ? '  /  ' : null}
            <span id="selectedSubCategory"></span>
          </h4>

          <div>
            <label htmlFor="measurement">Measurement:</label>
            <input id="measurement" type="text" />
          </div>
          <div>
            <label htmlFor="units">Units:</label>
            <input id="units" type="text" />
          </div>
          <div>
            <label htmlFor="measurement-direction">Is a lower or higher measurment impressive?</label>
            <select id="measurement-direction">
              <option>lower</option>
              <option>higher</option>
            </select>
          </div>
          <label>The title and description will be taken from the YouTube link</label>
          <p className="flexbox-container--column">
            <input placeholder="Add existing YouTube link" type="text" id="submittedLink" className="button" />
            { this.state.invalidLink ?
              <span className="submission-warning">Please enter a valid YouTube Link</span>
              : null
            }
            <button onClick={this.parseYouTubeLink.bind(this)} id="linkButton">Submit a YouTube link</button>
          </p>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    console.log('in render community id select: ', this.state.submitCommunity);
    return (
      <div  className="submissionContainer">
        {this.state.authenticated ? <div>
          <h1>Submit a Challenge</h1>
          <h3>Is this challenge for the entire site or a specific community?</h3>
          <form>
            <label className="radio-inline">
              <input onClick={this.submitLocation.bind(this, 'siteOnly')} type="radio" name="location" value="siteOnly" id="siteOnly" />Entire Site
            </label>
            <label className="radio-inline">
              <input onClick={this.submitLocation.bind(this, 'communityOnly')} type="radio" name="location" value="communityOnly" id="communityOnly" />Community Only
            </label>
          </form>

          { this.renderSubmitCommunity() }

          { this.renderSubmitUploadOption() }

          {this.renderSubmitUpload() }

        </div> :
          <h1>You need to be a member of this site to submit a submission</h1>
        }
      </div>
    )
  }
}