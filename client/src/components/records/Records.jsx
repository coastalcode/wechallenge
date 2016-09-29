import React from 'react';
import RecordList from './RecordList';
import RecordNav from './RecordNav';
import SearchBar from './SearchBar';

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      records: [],
      submissions: [],
      sortedSubmissions: []
    }
  }

  fetchRecords() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch('/records')
      .then((records)=> records.json())
      .then((records)=>{
        this.setState({ records });
        console.log(records)
    })
  }

  fetchVideos() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch('/submissions')
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
    })
  }

  componentDidMount() {
    this.fetchRecords();
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
      if (item && item.toLowerCase().indexOf(forThis.toLowerCase()) > -1) {
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
        Your current search: { this.state.search }
        <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordNav updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordList
          search={ this.state.search }
          submissions={ this.state.submissions }
          records={ this.state.records }
          checkForMatching={ this.checkForMatching }/>
      </div>
    )
  }
}