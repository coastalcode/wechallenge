import React from 'react';
import RecordList from './RecordList';
import RecordNav from './RecordNav';
import SearchBar from './SearchBar';

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    // eventually, we'll pass in database data here
    this.videos = [{ key: 1, name: "1", id: 'l6Zs_l7TOhg' }, { key: 2, name: "2", id: 'l6Zs_l7TOhg' }, { key: 3, name: "3", id: 'l6Zs_l7TOhg' }];

    this.state = { search: "" }
  }

  componentDidMount() {
    console.log("Records successfully mounted!")
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  render() {
    return (
      <div>
        This is the parent state: { this.state.search }
        <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordNav updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
        <RecordList videos={ this.videos }/>
      </div>
    )
  }
}