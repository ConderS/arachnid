import React, { Component } from 'react';
import '../styles/components/datapane.css';
import { ProcessData } from '../utils/processData';

import BarChart from './BarChart';
import Brush from './Brush';
import ScatterPlot from './ScatterPlot';

import { ProcessYelpData, ProcessMaxThreshold} from '../utils/processData';

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
        this.deleteMaxThresholdData = this.deleteMaxThresholdData.bind(this);

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

    deleteMaxThresholdData(key, threshold_value){
        const { updateData, chartData } = this.props;
        const newData = ProcessMaxThreshold(chartData, key, threshold_value);
        updateData(newData);
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
                    deleteMaxThresholdData={this.deleteMaxThresholdData}
                    {...this.props} />

                <Brush changeBrush={this.onBrush} size={[size[0], 50]} data={chartData}/>
            </div>
            );        
    }

    generateScatter() {
        return (
            <ScatterPlot 
            deleteMaxThresholdData={this.deleteMaxThresholdData} 
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