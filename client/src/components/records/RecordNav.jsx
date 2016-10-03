// TO DO:
  // 1) refactor to use category "object" instead of hardcoding
  // 2) why doesn't "key" work to label buttons?
  // 3) make each category collapsible and expandable
import React from 'react';
import Collapse from 'rc-collapse'
import CategoryList from './CategoryList';

const Panel = Collapse.Panel;

export default class RecordNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <CategoryList updateSearchTerm={ this.props.updateSearchTerm }/> )
  }
}
