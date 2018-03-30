import React, { Component } from 'react';

import { scaleLinear } from 'd3-scale';
import { max, sum, mean } from 'd3-array';
import { select, selectAll, mouse, event as currentEvent } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import { transition } from 'd3-transition';
import { axisBottom, axisRight, axisLeft} from 'd3-axis';
import { drag } from 'd3-drag';

// import Brush from './Brush';
import { ProcessYelpData } from '../utils/processData';

// import * as d3 from 'd3';

import '../styles/components/barchart.css';

export class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDatum: [],
            mouseover: false,
            dragging: false,
            barWidth: 0,
            originalX: 0,
            originalY: 0,
            spaceOffset: 150,
            updateDimensions: false,
            selectedRect: null,
            newData: null
        }

        this.createBarChart = this.createBarChart.bind(this);
        this.handleBarDown = this.handleBarDown.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.createBarChart();
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
        console.log("Updating viz...");
        this.createBarChart();
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.update !== this.props.update) {
            return true; 
        }
        
        return false;
    }

    createBarChart() {
        const { data, size, xAttr, yAttr, deleteMaxThresholdData} = this.props;
        const { spaceOffset } = this.state;

        const node = this.node;
        const dataMax = max(data.map(d => parseInt(d[yAttr])));

        const barWidth = size[0] / data.length;
        this.setState({ barWidth });

        const axisPadding = 50;

        const yScale = scaleLinear().domain([0, dataMax]).range([size[1], 0]);
        const xScale = scaleLinear().domain([0, data.length]).range([0, size[0]]);

        

        //=========BARS=========//
        
        // Bar Dragging
        var dragBar = drag()
                            .on('start', this.handleDragStart)
                            .on('drag', this.handleDragging)
                            .on('end', this.handleDragEnd)
        
        
        
        select(node)
            .selectAll('rect.bc-bar')
            .data(data)
            .enter()
            .append('rect')
                .attr('class', 'bc-bar');
        
        select(node)
            .selectAll('rect.bc-bar')
            .data(data)
            .exit()
                .remove();

        select(node)
            .selectAll('rect.bc-bar')
            .data(data)
                .attr('x', (d, i) => i * (barWidth) + axisPadding)
                .attr('y', d => (yScale(parseInt(d[yAttr])) + spaceOffset - axisPadding))
                .attr('height', d => (size[1] - yScale(parseInt(d[yAttr]))))
                .attr('width', barWidth)
                .style('fill', (d, i) => 'blue')
                .style('stroke', 'black')
                .on('mouseover', this.handleMouseOver)
                .on('mouseout', this.handleMouseOut)
                .on('mouseup', this.handleBarUp)
                .on('mousedown', this.handleBarDown)
                .call(dragBar);


        //=========LINE========//
        // Creating hypothetical line that indicates boundary for Bar to be dragged across for deletion
        
        // select(node)
        //     .selectAll('line.boundary')
        //     .data([1])
        //     .enter()
        //     .append('line')
        //         .attr('class', 'boundary');

        // select(node)
        //     .selectAll('line.boundary')
        //     .data([1])
        //     .exit()
        //         .remove();

        // select(node)
        //     .selectAll('line.boundary')
        //         .style('stroke', 'gray')
        //         .style('stroke-width', 2)
        //         .attr('x1', size[0])
        //         .attr('x2', size[0])
        //         .attr('y1', size[1] + spaceOffset)
        //         .attr('y2', 0);



        //========AXIS=======//
        
        var xAxis = axisBottom(xScale);
        var yAxis = axisLeft(yScale);

        //---X AXIS----//
        select(node)
            .selectAll('#BC-xAxis')
            .data([1])
            .enter()
                .append('g')
                .attr('class', 'axis')
                .attr('id', 'BC-xAxis');

        select(node)
            .selectAll('#BC-xAxis')
                .attr("transform", "translate(" + axisPadding + ", " + (size[1] + spaceOffset - axisPadding) +")")
                .raise()
                .call(xAxis);


        //---Y AXIS----//
        select(node)
            .selectAll('#BC-yAxis')
            .data([1])
            .enter()
                .append('g')
                .attr('class', 'axis')
                .attr('id', 'BC-yAxis');

        select(node)
            .selectAll('#BC-yAxis')
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
            .selectAll('#bc-xLabel')
            .data([1])
            .enter()
                .append('text')
                .attr("class", "draggable")
                .attr("id", "bc-xLabel");

        
        select(node)
            .selectAll('#bc-xLabel')
                .attr("y", size[1] + spaceOffset)
                .attr("x", size[0] / 2 + axisPadding)
                .text(xAttr)
                .raise()
                .call(dragTextX);
    
        //---Y Axis Label--//
        
        select(node)
            .selectAll('#bc-yLabel')
            .data([1])
            .enter()
                .append('text')
                .attr('id', 'bc-yLabel')
                .attr("transform", "rotate(-90)");


        select(node)
            .selectAll('#bc-yLabel')
                .attr("y", axisPadding / 2 - 10)
                .attr("x", -1 * (size[1] + spaceOffset + axisPadding)/2)
                .attr("class", "draggable")
                .text(yAttr)
                .raise()
                .call(dragTextY);

        select(node)
            .selectAll('.axis')
            .on('click', function(value,index){
                console.log(this);
                console.log(currentEvent);
                if(this.id === "BC-xAxis"){
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
                else if(this.id === "BC-yAxis"){
                    console.log(this);
                    // select(node)
                    //         .append('g')
                    //         .attr("class", "hover-line")
                    //         .append("line")
                    //         .attr('stroke', (d, i) => 'red')
                    //         .attr("x1", 50).attr("x2", size[0] + axisPadding) // vertical line so same value on each
                    //         .attr("y1", currentEvent.offsetY).attr("y2", currentEvent.offsetY);
                    deleteMaxThresholdData(yAttr, yScale.invert(mouse(this)[1]));
                }
            })
            .on('mouseover', function(value, index) {
                if (this.id === "BC-xAxis") {
                    select(node)
                        .append('g')
                        .attr("class", "hover-line")
                        .append("line")
                        .attr('stroke', (d, i) => 'red')
                        .attr("x1", currentEvent.offsetX).attr("x2", currentEvent.offsetX)
                        .attr("y1", 0).attr("y2", size[1] + spaceOffset - axisPadding);
                } else if (this.id === "BC-yAxis") {
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
    }

    //====Axis Label Event Handling====//
    
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


    //=====Bar Event Handling====//

    handleBarDown(d, index) {

        var selectedRect = select(this.node) 
            .selectAll('rect.bc-bar')
                .filter(function(_d, i) {
                    return (index === i);
                })._groups[0][0];

        select(selectedRect).style('fill', 'red');

        const originalX = select(selectedRect).attr('x');
        const originalY = select(selectedRect).attr('y');

        this.setState({ 
            selectedRect,
            originalX, 
            originalY 
        });
    }

    handleBarUp(d) {
        console.log('up');
        var bar = select(this);

        bar.style('fill', 'blue');
    }

    handleDragStart(d) {
        const { updateCurrentDatum } = this.props;
        var datum = d;
        datum.dragged = true;
        updateCurrentDatum([datum]);
    }

    handleDragging(d) {
        const { selectedRect, spaceOffset, mouseover, newData } = this.state;
        const { size, updateCurrentDatum, currentDatum } = this.props;

        var bar = select(selectedRect);

        // bar.lower();
        //Update position of bar by adding drag distance to each coordinate
        bar.attr('x', d.x = currentEvent.x)
            .attr('y', d.y = currentEvent.y)
            .classed('bc-active-bar', true);

        if (bar.attr('x') > size[0] || bar.attr('y') < spaceOffset - 50 || bar.attr('x') < 50) {
            bar.style('fill', 'gray');
        } else {
            bar.style('fill', 'red');
        }
        
        // var newDatum = currentDatum;      
        
        // if (mouseover && !newDatum.includes(newData))  {
        //     newDatum.push(d);
        // } else if (!mouseover && newDatum.includes(newData)) {
        //     newDatum.pop(d); 
        // }

        // updateCurrentDatum(newDatum);
    }    

    handleDragEnd(d) {
        const { mouseover, originalX, originalY, selectedRect, spaceOffset } = this.state;
        const { updateCurrentDatum, currentDatum, dedupChartData, deleteChartData, size } = this.props;

        var deduped = false;

        var bar = select(selectedRect);

        const endPositionX = bar.attr('x');
        const endPositionY = bar.attr('y');

        if (mouseover && currentDatum.length > 1) {
            console.log("Deduping...");
            dedupChartData('business_id', currentDatum);
            deduped = true;

        } else if (endPositionX > size[0] || endPositionY < spaceOffset - 50 || endPositionX < 50) {
            console.log("Deleting...");
            deleteChartData('business_id', currentDatum);

        } else {
            var t = transition().duration(100);

            bar.transition(t)
                .attr('x', originalX)
                .attr('y', originalY);
        }

        updateCurrentDatum([]);

        bar.style('fill', 'blue');
    }


    handleMouseOver(d) {
        const { updateCurrentDatum, currentDatum } = this.props;

        // if (currentDatum.length == 0) { return; }

        if (currentDatum.length > 0 && d.business_id !== currentDatum[0].business_id) {
            console.log("Hovering Different Element", d);
                
            //React needs to see an entirely new object being created in order for it to be considered a "new" update worthy of re-rendering other components for
            var newDatum = [];
            currentDatum.map(datum => {
                newDatum.push(datum);
            });
            var datum = d;
            datum.dragged = false;
            newDatum.push(datum);
            updateCurrentDatum(newDatum);

            this.setState({ mouseover: true });
            
            select(this.node)
                .selectAll('rect.bc-bar')
                    .filter(function(_d, i) {
                        return (d.business_id === _d.business_id);
                    })
                    .style('fill', '#27ae60');
        }
    }

    handleMouseOut(d) {
        const { updateCurrentDatum, currentDatum } = this.props;

        // if (currentDatum.length == 0) { return; }

        if (currentDatum.length > 0 && d.business_id !== currentDatum[0].business_id) {
            console.log("Mouse Out on Diff Element");
            
            var newDatum = [];
            currentDatum.map(datum => {
                newDatum.push(datum);
            });
            newDatum.pop();
            updateCurrentDatum(newDatum);

            this.setState({ mouseover: false });


            select(this.node)
                .selectAll('rect.bc-bar')
                    .filter(function(_d, i) {
                        return (d.business_id === _d.business_id);
                    })
                    .style('fill', 'blue');
        }
    }

    render() {
        const { size } = this.props;
        const { spaceOffset } = this.state;

        return (
                <svg className="bc-barChart" ref={node => this.node = node} width={size[0] + spaceOffset + 200} height={size[1] + spaceOffset}> 
                </svg>
            );
    }
}

export default BarChart;