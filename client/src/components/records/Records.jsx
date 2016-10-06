import React from 'react';
import RecordList from './RecordList';
import RecordNav from './RecordNav';
import SearchBar from './SearchBar';

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchRegion: "",
      searchType: "createdAt",
      filterType: "",
      records: [],
      submissions: [],
      sortedSubmissions: [],
      regions: []
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

    fetch(`/submissions/`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        let tempRegions = {};
        let regions = [];
        submissions.map(submission => {
          if (!tempRegions[submission.state]) {
            tempRegions[submission.state] = true;
          }
        })
        for (var key in tempRegions) {
          regions.push(key)
        }
        this.setState({ regions })
        return submissions})
      .then((submissions)=> sortFunction(this.state.searchType))
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  updateSearchRegion(searchRegion) {
    this.setState({ searchRegion })
    console.log(this.state.searchRegion)
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

    return (
      <div>
          Showing videos for: { this.state.searchRegion }
          <select onChange={ event => this.updateSearchRegion( event.target.value )}>
            <option value="">Show all</option>
            <option value={ localStorage.getItem('region') }>My region ({ localStorage.getItem('region') })</option>
          { this.state.regions.map((region)=>
            <option value={ region }>{ region }</option>) }
          </select>
        <div>
          Your current search: { this.state.search }
          <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
          <RecordNav updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        </div>

        <div>
          <button onClick={ event => this.sortSubmissions("createdAt") }>Sort by newest videos</button>
          <br/>
          <button onClick={ event => this.sortSubmissions("votes") }>Sort by most upvoted videos</button>
        </div>


        <RecordList
          search={ this.state.search }
          searchRegion = { this.state.searchRegion }
          submissions={ this.state.submissions }
          records={ this.state.records }
          checkForMatching={ this.checkForMatching }/>
      </div>
    )
  }
}