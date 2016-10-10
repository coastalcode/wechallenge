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
    return (
      <div>
      <div className="records-catlist">
        <div className="panel-group">

          <div onClick={ event => this.props.updateSearchRegion('') } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Show all
              </h4>
            </div>
          </div>

          <div onClick={ event => this.props.updateSearchRegion(localStorage.getItem('region')) } className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                My region ({ localStorage.getItem('region') })
              </h4>
            </div>
          </div>

          { this.props.regions.map((region) => {
            return (
              <div onClick={ event => this.props.updateSearchRegion(region) } className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    { region }
                  </h4>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <br/>
      <br/>
      <CategoryList updateSearchTerm={ this.props.updateSearchTerm }/>
      </div>
    )
  }
}
