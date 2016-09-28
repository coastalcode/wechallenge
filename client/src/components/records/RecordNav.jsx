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

    this.categories = [ ['eating', ['oranges', 'pizza']] , ['running', ['speed', 'distance']] ];
  }

  componentDidMount() {
    console.log("RecordNav successfully mounted!")
  }

  render() {
    return (
      <div>
        { this.categories.map((category)=>
          <CategoryList key={ category[0] }
            categoryName={ category[0] }
            subcategories={ category[1] }
            updateSearchTerm={ this.props.updateSearchTerm }/>
        )}

      </div>
    )
  }
}




      // <div>
      //   <Collapse accordion={ true } defaultActiveKey={ this.state.activeKey }>
      //     <Panel header="CategoryOne" key='0' onClick={event=>this.setState({ activeKey: ['0']})}>First panel</Panel>
      //     <Panel header="CategoryTwo" key='1' onClick={event=>this.setState({ activeKey: ['1']})}>Second panel</Panel>
      //   </Collapse>
      // </div>