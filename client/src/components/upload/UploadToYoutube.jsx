import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class UploadToYoutube extends Component {

  render() {return null}
}

export default scriptLoader('https://apis.google.com/js/client:plusone.js')(UploadToYoutube);