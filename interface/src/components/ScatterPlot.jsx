import React, { Component } from 'react';

import { scaleLinear } from 'd3-scale';
import { max, sum, mean } from 'd3-array';
import { select, selectAll, event as currentEvent, mouse } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import { transition } from 'd3-transition';
import { axisBottom, axisRight, axisLeft} from 'd3-axis';
import { drag } from 'd3-drag';

// import Brush from './Brush';
import { ProcessYelpData } from '../utils/processData';

import '../styles/components/scatterplot.css';

export class ScatterPlot extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentDatum: [],
            spaceOffset: 150
        }

        //Binding your functions sets the "this" context to that of the class, not the function itself (so you can call "this.state" and "this._OTHER_FUNCTION")
        // Whenever you create a new function in the component and you want it to be able to refer to outside functions and the state/props, you bind it like so here.
        this.createScatterPlot = this.createScatterPlot.bind(this);
        this.someEventHandler = this.someEventHandler.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    
    componentDidMount() {
        this.createScatterPlot();
    }

    componentDidUpdate() {
        console.log("Updating viz...");
        this.createScatterPlot();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.update !== this.props.update) {
            return true;
        }
        return false;
    }

    createScatterPlot() {
        const { chartData, size, xAttr, yAttr, deleteMaxThresholdData } = this.props;
        const { spaceOffset } = this.state;
        const node = this.node;
        const dataMax = max(chartData.map(d => parseInt(d[yAttr])));
        
        console.log(chartData.map(d => parseInt(d[yAttr])));

        const axisPadding = 50;

        const yScale = scaleLinear().domain([0, dataMax]).range([size[1], 0]);
        const xScale = scaleLinear().domain([0, chartData.length]).range([0, size[0]]);

        // --- SCATTER --- // 
        select(node)
            .selectAll("circle.sc-dot")
            .data(chartData)
            .enter()
            .append('circle')
                .attr('class', 'sc-dot');

        select(node)
            .selectAll("circle.sc-dot")
            .data(chartData)
            .exit()
                .remove();

        select(node)
            .selectAll("circle.sc-dot")
            .data(chartData)
                .attr('cx', (d, i) => xScale(i) + axisPadding)
                .attr('cy', d => (yScale(parseInt(d[yAttr])) + spaceOffset - axisPadding))
                .attr("r", 2)
                .style('fill', (d, i) => 'blue')
                .on('mouseover', this.handleMouseOver)
                .on('mouseout', this.handleMouseOut);


        //========AXIS=======//
        
        var xAxis = axisBottom(xScale);
        var yAxis = axisLeft(yScale);

        //---X AXIS----//
        select(node)
            .selectAll('#SC-xAxis')
            .data([1])
            .enter()
                .append('g')
                .attr('class', 'axis')
                .attr('id', 'SC-xAxis');

        select(node)
            .selectAll('#SC-xAxis')
                .attr("transform", "translate(" + axisPadding + ", " + (size[1] + spaceOffset - axisPadding) +")")
                .raise()
                .call(xAxis);


        //---Y AXIS----//
        select(node)
            .selectAll('#SC-yAxis')
            .data([1])
            .enter()
                .append('g')
                .attr('class', 'axis')
                .attr('id', 'SC-yAxis');

        select(node)
            .selectAll('#SC-yAxis')
                .attr("transform", "translate(" + axisPadding + ", " + (spaceOffset - axisPadding) + ")")
                .call(yAxis);
        
        //-----Axis Labels-----//
        var dragTextY = drag()
                            .on('start', this.handleDragTextStart)
                            .on('drag', this.handleDraggingTextY)
                            .on('end', this.handleDragTextStop)

        var dragTextX = drag()
                            .on('start', this.handleDragTextStart)
                            .on('drag', this.handleDraggingTextX)
                            .on('end', this.handleDragTextStop)

        //--X Axis Label---//
        select(node)
            .selectAll('#sc-xLabel')
            .data([1])
            .enter()
                .append('text')
                .attr("class", "draggable")
                .attr("id", "sc-xLabel");

        
        select(node)
            .selectAll('#sc-xLabel')
                .attr("y", size[1] + spaceOffset)
                .attr("x", size[0] / 2 + axisPadding)
                .text(xAttr)
                .raise()
                .call(dragTextX);
    
        //---Y Axis Label--//
        
        select(node)
            .selectAll('#sc-yLabel')
            .data([1])
            .enter()
                .append('text')
                .attr('id', 'sc-yLabel')
                .attr("transform", "rotate(-90)");


        select(node)
            .selectAll('#sc-yLabel')
                .attr("y", axisPadding / 2 - 10)
                .attr("x", -1 * (size[1] + spaceOffset + axisPadding)/2)
                .attr("class", "draggable")
                .text(yAttr)
                .raise()
                .call(dragTextY);
        

        // --- AXIS INTERACTIONS --- //
        select(node)
            .selectAll('.axis')
            .on('click', function(value,index){
                console.log(this);
                console.log(currentEvent);
                if(this.id === "SC-xAxis"){
                    console.log(this);
                    // select(node)
                    //         .append('g')
                    //         .attr("class", "hover-line")
                    //         .append("line")
                    //         .attr('stroke', (d, i) => 'red')
                    //         .attr("x1", currentEvent.offsetX).attr("x2", currentEvent.offsetX)
                    //         .attr("y1", 0).attr("y2", size[1] + spaceOffset - axisPadding);
                    deleteMaxThresholdData(xAttr, xScale.invert(mouse(this)[0]));
                }
                else if(this.id === "SC-yAxis"){
                    // var testThresholdValue = 7; // for testing purposes only -- generalize once working. 

                    // select(node)
                    //         .append('g')
                    //         .attr("class", "hover-line")
                    //         .append("line")
                    //         .attr('stroke', (d, i) => 'red')
                    //         .attr("x1", axisPadding).attr("x2", size[0] + axisPadding) // vertical line so same value on each
                    //         .attr("y1", currentEvent.offsetY).attr("y2", currentEvent.offsetY);
                    deleteMaxThresholdData(yAttr, yScale.invert(mouse(this)[1]));

                    console.log(yScale.invert(mouse(this)[1]));
                }            
            })
            .on('mouseover', function(value, index) {
                if (this.id === "SC-xAxis") {
                    select(node)
                        .append('g')
                        .attr("class", "hover-line")
                        .append("line")
                        .attr('stroke', (d, i) => 'red')
                        .attr("x1", currentEvent.offsetX).attr("x2", currentEvent.offsetX)
                        .attr("y1", 0).attr("y2", size[1] + spaceOffset - axisPadding);
                } else if (this.id === "SC-yAxis") {
                    select(node)
                        .append('g')
                        .attr("class", "hover-line")
                        .append("line")
                        .attr('stroke', (d, i) => 'red')
                        .attr("x1", axisPadding).attr("x2", size[0] + axisPadding) // vertical line so same value on each
                        .attr("y1", currentEvent.offsetY).attr("y2", currentEvent.offsetY);
                }
            })
            .on('mouseout', function(value, index) {
                selectAll('.hover-line')
                    .remove();
            });


        // select(node)
        //     .selectAll('.tick')
        //     .on('click', function(value, index){
        //         console.log(xScale(value) + axisPadding);
        //         if(this.parentElement.id === "SC-xAxis"){
        //             select(node)
        //                     .append('g')
        //                     .attr("class", "hover-line")
        //                     .append("line")
        //                     .attr('stroke', (d, i) => 'red')
        //                     .attr("x1", xScale(value) + axisPadding).attr("x2", xScale(value) + axisPadding)
        //                     .attr("y1", 0).attr("y2", size[1] + spaceOffset - axisPadding);
        //                     deleteMaxThresholdData(xAttr, this.childNodes[1].innerHTML);
        //         }
        //         else if(this.parentElement.id === "SC-yAxis"){
        //             select(node)
        //                     .append('g')
        //                     .attr("class", "hover-line")
        //                     .append("line")
        //                     .attr('stroke', (d, i) => 'red')
        //                     .attr("x1", 50).attr("x2", size[0] + axisPadding) // vertical line so same value on each
        //                     .attr("y1", yScale(value) + 2*axisPadding - 5).attr("y2", yScale(value) + 2*axisPadding - 5);
        //                     deleteMaxThresholdData(yAttr, this.childNodes[1].innerHTML);
        //         }
        //     });
    }

    handleDragTextStart(d){
        select(this).raise();
    }

    handleDraggingTextY(d){
        select(this)
        .raise()
        .attr('y', currentEvent.x)
        .attr('x', -currentEvent.y);
    }

    handleDraggingTextX(d){
        select(this)
        .raise()
        .attr('x', currentEvent.x)
        .attr('y', currentEvent.y);
    }

    handleDragTextStop(d){
        select(this).classed("active", false);
    }
    
    handleMouseOver(d){
        const { updateCurrentDatum } = this.props;
        
        updateCurrentDatum([d]);
    }
    
    handleMouseOut(d){
        const { updateCurrentDatum } = this.props;
        updateCurrentDatum([]);
    }


    someEventHandler() {

        /* Props is a global state. Just do what I do below at any time to extract the functions/properties out of the state.
        
         updateCurrentDatum = a FUNCTION that stores an ARRAY of selected data, or in this case, yelp records. When called, does not reset the viz. 
        
         currentDatum = a PROPERTY: the current array of selected data/yelp records

         currentDatum will be empty if you haven't updated it with "updateCurrentDatum" previously.

         updateData = a FUNCTION that takes in the new data and updates the data of the viz. Will RESET the viz with the new data
        */
       
        const { updateData, updateCurrentDatum, currentDatum } = this.props;

    }

    render() {
        const { size } = this.props;
        const { spaceOffset } = this.state;

        return <svg className="sc-ScatterChart" ref={node => this.node = node} width={size[0] + spaceOffset} height={size[1] + spaceOffset}> </svg>
    }
}

export default ScatterPlot;