import React, { Component } from 'react';

import { scaleLinear } from 'd3-scale';
import { max, sum, mean } from 'd3-array';
import { select, selectAll, event as currentEvent } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import { transition } from 'd3-transition';
import { axisBottom, axisRight, axisLeft} from 'd3-axis';
import { drag } from 'd3-drag';

import Brush from './Brush';
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
            spaceOffset: 300,
            updateDimensions: false,
            selectedRect: null,
            brushExtent: []
        }

        this.createBarChart = this.createBarChart.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.triggerDragBoundary = this.triggerDragBoundary.bind(this);
        this.onBrush = this.onBrush.bind(this);
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
        const { chartData, size } = this.props;
        const { spaceOffset } = this.state;

        const node = this.node;
        const dataMax = max(chartData.map(d => mean(d.review_count)));

        const barWidth = size[0] / chartData.length;
        this.setState({ barWidth });

        const yScale = scaleLinear().domain([0, dataMax]).range([0, size[1]]);
        const xScale = scaleLinear().domain([0, chartData.length]).range([0, size[0]]);

        
        var xAxis = axisBottom().scale(xScale);
        var yAxis = axisLeft().scale(yScale);
        var padding = 10

        //========AXIS=======//
        
        //---X AXIS----//
        console.log("AXIS");

        select(node)
            .selectAll('#BC-xAxis')
            .data([1])
            .enter()
                .append('g')
                .attr('class', 'axis')
                .attr('id', 'BC-xAxis');

        select(node)
            .selectAll('#BC-xAxis')
                .attr("transform", "translate(40, " + (size[0]/2 + 55) +")")
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
                .attr("transform", "translate("+(padding+30)+",-20)")
                .call(yAxis);
     

        //-----Axis Labels-----//
        var dragText = drag()
                            .on('start', this.handleDragTextStart)
                            .on('drag', this.handleDraggingText)
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
                .attr("y", 0 + size[0] - 160)
                .attr("x",0)
                .attr("dx", "15em")
                .text("BusinessId")
                .call(dragText);
    
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
                .attr("y", 0)
                .attr("x",0 - (size[1] / 2))
                .attr("dy", "1em")
                .attr("class", "draggable")
                .text("Review Count")
                .call(dragText);


        //=========BARS=========//
        
        // Bar Dragging
        var dragBar = drag()
                            .on('start', this.handleDragStart)
                            .on('drag', this.handleDragging)
                            .on('end', this.handleDragEnd)
        
        
        
        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
            .enter()
            .append('rect')
                .attr('class', 'bc-bar');
        
        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
            .exit()
                .remove();

        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
                .attr('x', (d, i) => i * (barWidth))
                .attr('y', d => (size[1] + spaceOffset) - yScale(mean(d.review_count)))
                .attr('height', d => yScale(mean(d.review_count)))
                .attr('width', barWidth)
                .style('fill', (d, i) => 'blue')
                .style('stroke', 'black')
                .on('mouseover', this.handleMouseOver)
                .on('mouseout', this.handleMouseOut)
                .on('mouseup', this.handleUp)
                .on('mousedown', this.handleDown)
                .call(dragBar);


        //=========LINE========//
        // Creating hypothetical line that indicates boundary for Bar to be dragged across for deletion
        
        select(node)
            .selectAll('line.boundary')
            .data([1])
            .enter()
            .append('line')
                .attr('class', 'boundary');

        select(node)
            .selectAll('line.boundary')
            .data([1])
            .exit()
                .remove();

        select(node)
            .selectAll('line.boundary')
                .style('stroke', 'gray')
                .style('stroke-width', 2)
                .attr('x1', size[0])
                .attr('x2', size[0])
                .attr('y1', size[1] + spaceOffset)
                .attr('y2', 0);

    }

    handleDragTextStart(d){
        select(this).raise().classed("active", true);
    }
    handleDraggingText(d){
        console.log(currentEvent)
        select(this)
        .lower()
        .attr('x', currentEvent.x)
        .attr('y', currentEvent.y);
    }
    handleDragTextStop(d){
        select(this).classed("active", false);
    }


    handleDragStart(d) {
        const { updateCurrentDatum } = this.props;
        updateCurrentDatum([d]);
    }
    handleDragging(d) {
        var bar = select(this);

        bar.lower();
        //Update position of bar by adding drag distance to each coordinate
        bar.attr('x', d.x = currentEvent.x)
            .attr('y', d.y = currentEvent.y)
            .classed('bc-active-bar', true);
    }

    triggerDragBoundary(d) {
        // const { originalX, totalBarSpace } = this.state;

        // const upperLimit = originalX + totalBarSpace;
        // const lowerLimit = originalX - totalBarSpace;

       
        // if (d.x > upperLimit) {
        //     console.log("LIMIT")
        //     select(this.node)
        //         .selectAll('rect.bc-bar')
        //             .filter(function(_d, i) {
        //                 const overlapBarSpace = i * totalBarSpace;
        //                 return (d.business_id !== _d.business_id) && (overlapBarSpace >= (upperLimit - 10) && overlapBarSpace <= (upperLimit + 10));
        //             })
        //             .style('fill', 'red');

        // } else if (d.x)

    }


    handleDown(d, i) {

        var selectedRect = select(this.node) 
            .selectAll('rect.bc-bar')
                .filter(function(_d, i) {
                    return (d.business_id === _d.business_id);
                })._groups[0][0];

        select(selectedRect).style('fill', 'red');

        const originalX = select(selectedRect).attr('x');
        const originalY = select(selectedRect).attr('y');

        this.setState({ 
            selectedRect,
            originalX, 
            originalY });
    }

    handleUp(d) {
        console.log('up');
        var bar = select(this);

        bar.style('fill', 'blue');
    }

    handleDragEnd(d) {
        const { mouseover, originalX, originalY, selectedRect } = this.state;
        const { updateCurrentDatum, currentDatum } = this.props;

        var deduped = false;

        if (mouseover && currentDatum.length > 1) {
            console.log("DEDUP");
        
            var arrayIDs = [];
            currentDatum.map(datum => {
                arrayIDs.push({id: datum.business_id, count: datum.review_count});
            });
            const newData = ProcessYelpData(this.props.chartData, 'business_id', arrayIDs);
            this.props.updateData(newData);
            deduped = true;
        } else {
            var t = transition().duration(100);

            select(selectedRect)
                .transition(t)
                .attr('x', originalX)
                .attr('y', originalY);
        }

        updateCurrentDatum([]);

        select(selectedRect)
            .style('fill', 'blue');

    }


    handleMouseOver(d) {
        const { updateCurrentDatum, currentDatum } = this.props;

        // if (currentDatum.length == 0) { return; }

        if (currentDatum.length > 0 && d.business_id !== currentDatum[0].business_id) {
            console.log("Hovering Different Element", d);
            var newDatum = currentDatum;
            newDatum.push(d);

            this.setState({ mouseover: true });
            updateCurrentDatum(newDatum);

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
            var newDatum = currentDatum;
            newDatum.pop(d);

            this.setState({ mouseover: false });
            updateCurrentDatum(newDatum);

            select(this.node)
                .selectAll('rect.bc-bar')
                    .filter(function(_d, i) {
                        return (d.business_id === _d.business_id);
                    })
                    .style('fill', 'blue');
        }
    }

    onBrush(d) {
        this.setState({ brushExtent: d });
    }

    render() {
        const { size } = this.props;
        const { spaceOffset } = this.state;

        return (
            <div>
                <svg className="bc-barChart" ref={node => this.node = node} width={size[0] + spaceOffset} height={size[1] + spaceOffset}> </svg>
                <Brush changeBrush={this.onBrush} size={[size[0], 50]} />
            </div>
            );
    }
}

export default BarChart;