import React, { Component } from 'react';
import '../styles/components/datapane.css';
import { ProcessData } from '../utils/processData';

import BarChart from './BarChart';
import Brush from './Brush';
import ScatterPlot from './ScatterPlot';

import { ProcessYelpData } from '../utils/processData';

export class DataPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
          datum: [],
          allowDedup: false,
          brushExtent: [0, this.props.chartData.length]
        };
        
        this._updateDimensions = this._updateDimensions.bind(this);
        this.onBrush = this.onBrush.bind(this);
        this.dedupChartData = this.dedupChartData.bind(this);
        this.deleteChartData = this.deleteChartData.bind(this);
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

    onBrush(d) {
        this.setState({ brushExtent: d });
        this.props.driveChartUpdate();
    }

    dedupChartData(key, dedupArray) {
        const { updateData, chartData } = this.props;

        const newData = ProcessYelpData(chartData, key, dedupArray);
        updateData(newData);
    }

    deleteChartData(key, deleteArray) {
        const { updateData, chartData } = this.props;

        const newData = ProcessYelpData(chartData, key, deleteArray, true);
        updateData(newData);
    }

    render() {        
      
      const { size, chartData, updateCurrentDatum, currentDatum, update } = this.props;
      const { brushExtent } = this.state;
      
      const filteredData = chartData.slice(brushExtent[0], brushExtent[1]+1);


        // COMMENT OUT the component that you don't want to work with. React uses {/* <code> */} for commenting

      return (

            <div>                
                {/* <ScatterPlot {...this.props} /> */}
                <BarChart 
                    data={filteredData} 
                    dedupChartData={this.dedupChartData}
                    deleteChartData={this.deleteChartData} 
                    {...this.props} />

                <Brush changeBrush={this.onBrush} size={[size[0], 50]} data={chartData}/>
            </div>
        )
    }
  }

export default DataPane;