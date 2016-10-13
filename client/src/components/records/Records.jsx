import React from 'react';
import RecordList from './RecordList';
import RecordNav from './RecordNav';

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

    if (!this.props.cid) {
    fetch(`/submissions/`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        let tempRegions = {};
        let regions = [];
        submissions.map(submission => {
          if (!tempRegions[submission.state] && submission.state) {
            tempRegions[submission.state] = true;
          }
        })
        for (var key in tempRegions) {
          regions.push(key)
        }
        this.setState({ regions })
        return submissions})
      .then((submissions)=> sortFunction(this.state.searchType))

    } else {
    fetch(`/communities/submissions/${ this.props.cid }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
        return submissions})
      .then((submissions)=> sortFunction(this.state.searchType))
    }
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  updateSearchRegion(searchRegion) {
    this.setState({ searchRegion })
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
    let submissions = this.state.submissions.slice();
    submissions.sort(function (a, b) {
      if (a[searchType] > b[searchType]) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({ submissions })
    this.setState({ searchType })
  }

  componentDidMount() {
    this.fetchRecords();
    this.fetchVideos();
  }

  render() {
    let cid = (this.props.cid) ? this.props.cid : null;
    return (
      <div className="allrecords-main">
        { (this.state.regions.length > 0) ?
          <RecordNav
            sortSubmissions={ this.sortSubmissions.bind(this) }
            updateSearchRegion={ this.updateSearchRegion.bind(this) }
            updateSearchTerm={ this.updateSearchTerm.bind(this) }
            regions={ this.state.regions } /> : null }

        { (this.state.submissions.length > 0) ?
        <RecordList
          cid={ cid }
          updateSearchTerm={ this.updateSearchTerm.bind(this) }
          search={ this.state.search }
          searchRegion = { this.state.searchRegion }
          submissions={ this.state.submissions }
          records={ this.state.records }
          checkForMatching={ this.checkForMatching }/> : null }

      </div>
    )
  }
}