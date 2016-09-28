import React, { Component } from 'react';
import list from '../lib/categories';

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    console.log('----Props------', this.props);
    console.log('list: ', list);
    return (
      <div>
        <h1>Inside the CategoryList</h1>
      </div>
    )
  }

}