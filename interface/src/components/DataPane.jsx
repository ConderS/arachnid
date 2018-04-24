import React, { Component } from 'react';
import '../styles/components/datapane.css';
import { ProcessData } from '../utils/processData';

import BarChart from './BarChart';
import Brush from './Brush';
import ScatterPlot from './ScatterPlot';

import { ProcessYelpData, ProcessMaxThreshold } from '../utils/processData';

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
        this.addMaxThresholdQF = this.addMaxThresholdQF.bind(this);

        this.renderChart = this.renderChart.bind(this);
        this.generateBar = this.generateBar.bind(this);
        this.generateScatter = this.generateScatter.bind(this);
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

    dedupChartData(attr, dedupArray) {
        const { updateData, chartData, addQF } = this.props;

        const qf = {
            type: "Dedup_Two",
            pursue: dedupArray,
            attribute: attr
        }
    
        addQF(qf);
        
        //Resetting chart purely for the sake of resetting the bars after drag ends - Implement this in D3 (TODO)
        updateData(chartData);
        // const newData = ProcessYelpData(chartData, attr, dedupArray);
    }

    deleteChartData(attr, deleteArray) {
        const { updateData, chartData, addQF } = this.props;

        const qf = {
            type: "Delete_One",
            pursue: deleteArray,
            attribute: attr
        }

        addQF(qf);
    }

    // deleteMaxThresholdData(key, threshold_value){
    //     const { updateData, chartData } = this.props;
    //     const newData = ProcessMaxThreshold(chartData, key, threshold_value);
    //     updateData(newData);
    // }

    addMaxThresholdQF(attr, thresholdValue){
        const { chartData, addQF } = this.props;

        const qf = {
            type: "Max_Threshold",
            pursue: thresholdValue,
            attribute: attr
        }
        
        addQF(qf);
    }

    
    renderChart() {
        const { chartType } = this.props;

        switch (chartType) {
            case "bar":
                return this.generateBar();
            case "scatter":
                return this.generateScatter();
            default:
                return this.generateBar();
        }

    }

    generateBar() {
        const { size, chartData } = this.props;

        const { brushExtent } = this.state;
      
        const filteredData = chartData.slice(brushExtent[0], brushExtent[1]+1);
        return (
            <div className="bc-Container">
                <BarChart 
                    data={filteredData} 
                    dedupChartData={this.dedupChartData}
                    deleteChartData={this.deleteChartData}
                    addMaxThresholdQF={this.addMaxThresholdQF}
                    {...this.props} />

                <Brush changeBrush={this.onBrush} size={[size[0], 50]} data={chartData}/>
            </div>
            );        
    }

    generateScatter() {
        return (
            <ScatterPlot 
            addMaxThresholdQF={this.addMaxThresholdQF} 
            {...this.props} />
            );
    }

    render() {        
        
        const { generateChart } = this.props;

        return (

            <div id="view">

                {/* Temporary Buttons */}
                <button className="btn btn-primary" onClick={() =>generateChart("bar")}>Bar Chart</button>
                <button className="btn btn-success" onClick={() => generateChart("scatter")}>Scatter Plot</button>      
                
                {this.renderChart()}
            </div>
        )
    }
  }

export default DataPane;