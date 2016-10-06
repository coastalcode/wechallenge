import React from 'react';
import list from './../../../lib/categories.js';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false }
  }

  render() {
    var that = this
    return (
      <div>
      <button onClick={ event => that.props.updateSearchTerm("") }>Clear Search</button>
      <div className="records-catlist">
        <div className="panel-group" id="accordion">
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


