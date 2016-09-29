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

    this.categories = [
  ['Animal', 'Cats', 'Dogs', 'Size'],
  ['Art', 'Drawing', 'Origami', 'Sculptures'],
  ['Computers', 'Speed', 'Typing'],
  ['Exercise', 'Chinups', 'Handstand time', 'Pullups', 'Pullups', 'Situps'],
  ['Food', 'Fit in ones mouth', 'Speed Eating', 'Total Amount'],
  ['Memorization', 'Movie Quotes', 'Phone Numbers', 'Pi digits'],
  ['Music', 'Instruments'],
  ['Sports', 'Basketball', 'Golf', 'Sailing', 'Skiing', 'Scoccer', 'Weightlifting']
]
  }

  componentDidMount() {
    console.log("RecordNav successfully mounted!")
  }

  render() {
    // return (
    //   <div>
    //     { this.categories.map((category)=>
    //       <CategoryList key={ category[0] }
    //         categoryName={ category[0] }
    //         subcategories={ category.slice(1) }
    //         updateSearchTerm={ this.props.updateSearchTerm }/>
    //     )}
    //   </div>
    // )
    return (<CategoryList updateSearchTerm={ this.props.updateSearchTerm }/>)
  }
}




      // <div>
      //   <Collapse accordion={ true } defaultActiveKey={ this.state.activeKey }>
      //     <Panel header="CategoryOne" key='0' onClick={event=>this.setState({ activeKey: ['0']})}>First panel</Panel>
      //     <Panel header="CategoryTwo" key='1' onClick={event=>this.setState({ activeKey: ['1']})}>Second panel</Panel>
      //   </Collapse>
      // </div>