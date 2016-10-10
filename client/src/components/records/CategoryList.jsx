import React from 'react';
import list from './../../lib/categories.js';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false }
  }

  render() {
    var that = this
    return (
      <div>


      <div className="allrecords-catlist">
        <div className="panel-group">

          <div onClick={ event => this.props.sortSubmissions("createdAt") } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Sort by upload date
              </h4>
            </div>
          </div>

          <div onClick={ event => this.props.sortSubmissions("votes") } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Sort by # of votes
              </h4>
            </div>
          </div>

        </div>
      </div>

      <div className="allrecords-catlist">
        <div className="panel-group">

          <div onClick={ event => this.props.updateSearchRegion('') } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Clear search region
              </h4>
            </div>
          </div>

          <div onClick={ event => this.props.updateSearchRegion(localStorage.getItem('region')) } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                My region ({ localStorage.getItem('region') })
              </h4>
            </div>
          </div>

          { this.props.regions.map((region) => (
            <div onClick={ event => this.props.updateSearchRegion(region) } className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  { region }
                </h4>
              </div>
            </div>
          ))}

        </div>
      </div>


      <div className="allrecords-catlist">
        <div className="panel-group" id="accordion">

          <div onClick={ event => this.props.updateSearchTerm('') } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Clear search term
              </h4>
            </div>
          </div>

          {list.map(function(category, catIndex) {
            return (
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + catIndex}>
                    {category[0]}
                  </h4>
                </div>
                <div id={"collapse" + catIndex} className="panel-collapse collapse">
                  {category.map(function(subCategory, subIndex) {
                    if (subIndex > 0) {
                      return (
                        <div className="panel-body" className="list-group">
                           <button type="button" className="list-group-item btn-xs" onClick={ event => that.props.updateSearchTerm(subCategory) }>{ subCategory }</button>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    )
  }
}


