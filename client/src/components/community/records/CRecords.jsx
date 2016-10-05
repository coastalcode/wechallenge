import React from 'react';
import CRecordList from './CRecordList';
import CRecordNav from './CRecordNav';
import CSearchBar from './CSearchBar';

export default class CRecords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchType: "createdAt",
      filterType: "",
      records: [],
      submissions: [],
      sortedSubmissions: []
    }
  }

  fetchRecords() {
    fetch('/records')
      .then((records)=> records.json())
      .then((records)=>{
        this.setState({ records });
        console.log(records)
    })
  }

  fetchVideos() {
    let sortFunction = this.sortSubmissions.bind(this)

    fetch(`/communities/submissions/${ this.props.location.query.cid }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
        return submissions})
      .then((submissions)=> sortFunction(this.state.searchType))
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  // use this to account for non-exact matches
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

    return bool;
  }

  sortSubmissions(searchType) {
    this.state.submissions.sort(function (a, b) {
      if (a[searchType] > b[searchType]) {
        return -1
      } else {
        return 1
      }
    })
    console.log("sorted", this.state.submissions)
    this.setState({ searchType })
  }


  filterSubmissions(filterType) {

  }

  componentDidMount() {
    this.fetchRecords();
    this.fetchVideos();
  }

  render() {
    let cid = this.props.location.query.cid;
    console.log("THIS IS CID!!!", cid)
    return (
      <div>

        <div>
          Your current search: { this.state.search }
          <CSearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
          <CRecordNav updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        </div>

        <div>
          <button onClick={ event => this.sortSubmissions("createdAt") }>Sort by newest videos</button>
          <br/>
          <button onClick={ event => this.sortSubmissions("votes") }>Sort by most upvoted videos</button>
        </div>


        <CRecordList
          cid={ cid }
          search={ this.state.search }
          submissions={ this.state.submissions }
          records={ this.state.records }
          checkForMatching={ this.checkForMatching }/>
      </div>
    )
  }
}