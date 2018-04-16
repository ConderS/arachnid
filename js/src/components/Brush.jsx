import React, { Component } from 'react';
import '../styles/components/brush.css';

import { select, event as currentEvent } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { brushX } from 'd3-brush';
import { axisBottom } from 'd3-axis'; 

export class Brush extends Component {
    constructor(props) {
        super(props);

        this.createBrush = this.createBrush.bind(this);
    }

    componentDidMount() {
        this.createBrush();
    }

    componentDidUpdate() {
        this.createBrush();
    }

    createBrush() {
        const { data, size } = this.props;

        const node = this.node;
        
        const axisPadding = 50;
        const scale = scaleLinear().domain([0, data.length]).range([axisPadding, size[0] + axisPadding]);


        const dayBrush = brushX()
                            .extent([[0, 0], this.props.size])
                            .on("brush", brushed);
        
        const dayAxis = axisBottom().scale(scale);

        select(node)
            .selectAll("g.brushAxis")
            .data([0])
            .enter()
            .append("g")
            .attr("class", "brushAxis")
            .attr("transform", "translate(0, 25)");

        select(node)
            .select("g.brushAxis")
            .call(dayAxis);

        select(node)
            .selectAll("g.brush")
            .data([0])
            .enter()
            .append("g")
            .attr("class", "brush");

        select(node)
            .select("g.brush")
            .call(dayBrush);

        const brushFn = this.props.changeBrush;
        
        //More convenient to define function within
        function brushed() {
            const selectedExtent = currentEvent.selection.map(d => parseInt(scale.invert(d)));

            brushFn(selectedExtent);
        }
    }


    render() {
        return (
            <svg className="bc-brush" ref={node => this.node = node} width={this.props.size[0]} height={50}></svg>
            );
    }
}

export default Brush;