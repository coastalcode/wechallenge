import React from 'react';
import categories from './../../lib/categories.js';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { on: false }
  }

  componentDidMount() {
    console.log("RecordEntry successfully mounted!")
  }

  render() {
    return (
      <div className="dropdown">
        <button>{ this.props.categoryName }</button>
        <br/>
        { this.props.subcategories.map((subcategory)=>{
          return (
            <p>
            <button onClick={ event => this.props.updateSearchTerm(subcategory) }>{ subcategory }</button>
            </p>
          )
        })}
      </div>
    )
  }
}