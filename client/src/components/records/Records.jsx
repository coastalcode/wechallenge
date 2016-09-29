import React from 'react';
import RecordList from './RecordList';
import RecordNav from './RecordNav';
import SearchBar from './SearchBar';

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      submissions: [],
    }
  }

  fetchVideos() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch('/submissions')
      .then((submissions)=> submissions.json())
      .then((submissions)=>{ this.setState({ submissions });
        console.log(submissions)
    })
  }

  componentDidMount() {
    console.log("Records successfully mounted!")
    this.fetchVideos();
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  checkForMatching(checkThese, forThis) {
    let bool = false;
    if (forThis === "") {
      return true;
    }

    checkThese.forEach((item)=>{
      if (item.toLowerCase().indexOf(forThis.toLowerCase()) > -1) {
        bool = true;
      }
    })

    // it didn't work without this console log ..
    console.log(checkThese)
    return bool;
  }

  render() {
    return (
      <div>
        For testing purposes, this is the parent state: { this.state.search }
        <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordNav updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordList
          search={ this.state.search }
          submissions={ this.state.submissions }
          checkForMatching={ this.checkForMatching }/>
      </div>
    )
  }
}