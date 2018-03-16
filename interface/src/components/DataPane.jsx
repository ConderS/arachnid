import React, { Component } from 'react';

import * as vega from 'vega';
import '../styles/components/datapane.css';
import { ProcessData } from '../utils/processData';

import BarChart from './BarChart';

export class DataPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
          datum: [],
          allowDedup: false
        };
        
        // this.renderDatum = this.renderDatum.bind(this);
        // this.addToVariablesList = this.addToVariablesList.bind(this);
        // this.shiftClickHandler = this.shiftClickHandler.bind(this);
        // this.hideOrShowDedupButton = this.hideOrShowDedupButton.bind(this);
        // this.handleDedupButton = this.handleDedupButton.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    // addToVariablesList(item) {
    //    const city = item.datum.city;
    //    var { datum } = this.state;

    //    if (datum.includes(city)) {
    //      const index = datum.indexOf(city);
    //      datum.splice(index, 1);
    //    } else {
    //      datum.push(city);
    //    }

    //    this.setState({ datum });
    // }

    // hideOrShowDedupButton() {
    //   const { datum } = this.state;

    //   if (datum.length > 0) {
    //     this.setState({ allowDedup: true });
    //   } 
    // }

    // renderDedupButton() {
    //   const { allowDedup } = this.state;

    //   if (allowDedup) {
    //     return (<button className="data-btn btn btn-primary" onClick={this.handleDedupButton}>Deduplicate</button>);
    //   }
    // }

    // handleDedupButton() {
    //   const { selectedField, datum } = this.state;
    //   const { updateData } = this.props;
      
    //   const newData = ProcessData(data, selectedField, datum);

    //   console.log("new Data: ", newData);
    //   updateData(newData);
    //   this.setState({ datum: [], allowDedup: false });

    //   this.setupView();
    // }

    // renderDatum() {

    //   const { datum } = this.state;

    //   if (!datum) { return; }

    //   return datum.map((item, index) => {
          
    //       return <p key={index} className="datum-text">{item}</p>
    //     });
    // }

    render() {        

      return (
            <div>
                <div className="variablesMenu">
                  <h1 className="variablesMenuHeader">Attributes</h1>
                  {/*{this.renderDatum()}
                  {this.renderDedupButton()}*/}
                </div>
                <BarChart {...this.props} />
            </div>
        )
    }
  }

export default DataPane;