import React, { Component } from 'react';
import list from '../lib/categories';

export default class CategoryList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      readyForSubCategory: false,
      category: null
    }
  }

  categoryPicked(catIndex) {
    this.setState({
      readyForSubCategory: true,
      category: catIndex
    })
  }

  render() {
    var that = this;
    return (
      <div>
        <h4>Pick a Category</h4>
        {list.map((category, catIndex) => {
          return (
            <button onClick={that.categoryPicked.bind(that, catIndex)} className="btn btn-primary">{category[0]}</button>
          )
        })}

        {this.state.readyForSubCategory ?
          <div>
            <h4>Pick a Subcategory</h4>
            {list[this.state.category].map((subCategory, subIndex) => {
              if (subIndex > 0) {
                return (
                  <button onClick={that.props.selectCategory.bind(that,list[this.state.category][0],subCategory)} className="btn btn-primary">{subCategory}</button>
                )
              }
            })}
          </div>
          :
          null
        }

      </div>
    )
  }

}