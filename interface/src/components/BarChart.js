import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max, sum, mean } from 'd3-array';
import { select } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import { transition } from 'd3-transition';

import '../styles/components/barchart.css';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {
        const { chartData, size } = this.props;

        const node = this.node;
        const dataMax = max(chartData.map(d => mean(d.review_count)));
        const barWidth = size[0] / chartData.length;

        const yScale = scaleLinear().domain([0, dataMax]).range([0, size[1]])

        select(node)
            .selectAll('rect.bar')
            .data(chartData)
            .enter()
            .append('rect')
                .attr('class', 'bar')
                //add .on drag
        
        select(node)
            .selectAll('rect.bar')
            .data(chartData)
            .exit()
                .remove()

        select(node)
            .selectAll('rect.bar')
            .data(chartData)
                .attr('x', (d, i) => i * barWidth)
                .attr('y', d => size[1] - yScale(mean(d.review_count)))
                .attr('height', d => yScale(mean(d.review_count)))
                .attr('width', barWidth)
                .style('fill', (d, i) => 'blue')
                .style('stroke', 'black')
    }

    render() {
        const { size } = this.props;

        return <svg className="barChart" ref={node => this.node = node} width={size[0]} height={size[1]}> </svg>
    }
}

export default BarChart;