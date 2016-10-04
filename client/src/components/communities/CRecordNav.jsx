import React from 'react';
import Collapse from 'rc-collapse'
import CategoryList from './CategoryList';

const Panel = Collapse.Panel;

export default class CRecordNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <CategoryList updateSearchTerm={ this.props.updateSearchTerm }/> )
  }
}
