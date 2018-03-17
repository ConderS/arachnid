import React, { Component } from 'react';

import * as vega from 'vega';
import '../styles/components/datapane.css';
import { ProcessData } from '../utils/processData';

import BarChart from './BarChart';
import ScatterPlot from './ScatterPlot';

export class DataPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
          datum: [],
          allowDedup: false
        };
        
        this._updateDimensions = this._updateDimensions.bind(this);
    }

    _updateDimensions() {

        console.log("Updating dimensions...");

        const { updateDimensions } = this.props;
        const screenWidth = window.innerWidth / 2;
        const screenHeight = (window.innerHeight - 100) / 2;

        updateDimensions(screenWidth, screenHeight);
    }

    componentWillMount() {
        this._updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this._updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this._updateDimensions);
    }
    componentDidUpdate() {

    }

    render() {        

        // COMMENT OUT the component that you don't want to work with. React uses {/* <code> */} for commenting
        
      return (
            <div>
                <div className="variablesMenu">
                  <h1 className="variablesMenuHeader">Attributes</h1>
                </div>
                {/* <ScatterPlot {...this.props} /> */}
                <BarChart {...this.props} />
            </div>
        )
    }
  }

export default DataPane;