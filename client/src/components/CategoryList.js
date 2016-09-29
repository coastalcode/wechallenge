import React, { Component } from 'react';
import list from '../lib/categories';

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('----Props------', this.props);
    console.log('list: ', list);
    return (
      <div>
        <h1>Inside the CategoryList</h1>
        <div className="panel-group" id="accordion">
          {list.map(function(category) {
            <h3>{category[0]}</h3>
          })}
        </div>
      </div>
    )
  }

}