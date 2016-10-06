import React, { Component } from 'react';
import list from '../lib/categories';

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var that = this;
    return (
      <div>
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
                           <button type="button" className="list-group-item btn-xs" onClick={that.props.selectCategory.bind(that,category[0],subCategory)}>{subCategory}</button>
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
    )
  }

}

