import React from 'react';
import RecordEntry from './RecordEntry';
import SearchBar from './SearchBar';

export default class RecordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyShowing : [],
      index: 0,
      perPage: 5
      // change this to easily change number shown per page
    }
  }

  selectSubmissions(one) {
    let index = this.state.index + (one * 6)
    this.setState({ index })
  }


  componentDidMount() {
    this.selectSubmissions(1);
  }

  render() {
    return (
     (this.props.cid) ?
      ( <div className="allrecords-recordslist-main">
         <div className="allrecords-recordslist-top">
          <div>Search: </div>
          <SearchBar updateSearchTerm={ this.props.updateSearchTerm }/>

          <div>
          {
            (this.state.index > 0) ?
            <button onClick={ event => this.changePage(-1) }>Prev!</button> : null
          }
          {
            ((this.state.index + this.state.perPage) < this.props.submissions.length) ?
            <button onClick={ event => this.changePage(1) }>Next!</button> : null
          }
          </div>
        </div>


         <div className="allrecords-children allrecords-recordlist">

          { this.props.submissions.map((submission) => {
            return (<RecordEntry key={ submission.id }
              cid={ this.props.cid }
              submission={ submission }
              checkForMatching={ this.props.checkForMatching }
              search={ this.props.search }
              searchRegion = { this.props.searchRegion }/>)
          })}
          <br/>
        </div>
        </div>
      )
      : (
        <div className="allrecords-recordslist-main">

         <div className="allrecords-recordslist-top">
          <div>Search: </div>
          <SearchBar updateSearchTerm={ this.props.updateSearchTerm }/>

          <div>
          {
            (this.state.index > 0) ?
            <button onClick={ event => this.changePage(-1) }>Prev!</button> : null
          }
          {
            ((this.state.index + this.state.perPage) < this.props.submissions.length) ?
            <button onClick={ event => this.changePage(1) }>Next!</button> : null
          }
          </div>
        </div>


        <div className="allrecords-children allrecords-recordlist">


        { this.props.submissions.map((submission, subindex) =>
          (<RecordEntry key={ submission.id }
            subindex={ subindex }
            submission={ submission }
            checkForMatching={ this.props.checkForMatching }
            search={ this.props.search }
            searchRegion = { this.props.searchRegion }/>)
        )}
        <br/>


      </div>
      </div>)
      )
  }
}
