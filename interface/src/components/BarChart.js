import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max, sum, mean } from 'd3-array';
import { select } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import { transition } from 'd3-transition';
import { axisBottom, axisRight} from 'd3-axis';

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

        const xScale = scaleLinear().domain([0, chartData.length]);
        const yScale = scaleLinear().domain([0, dataMax]).range([0, size[1]]);

        var xAxis = axisBottom().scale(xScale);
        var yAxis = axisRight().scale(yScale);

        select(node).append('svg').append('g').attr('id', 'BC-xAxis').attr('transform', 'translate(0, ' + size[1] + ')').call(xAxis);

        select(node).append('svg').append('g').attr('id', 'BC-yAxis').call(yAxis);

        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
            .enter()
            .append('rect')
                .attr('class', 'bc-bar')
                //add .on drag
        
        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
            .exit()
                .remove()

        select(node)
            .selectAll('rect.bc-bar')
            .data(chartData)
                .attr('x', (d, i) => i * (barWidth + 5))
                .attr('y', d => size[1] - yScale(mean(d.review_count)))
                .attr('height', d => yScale(mean(d.review_count)))
                .attr('width', barWidth)
                .style('fill', (d, i) => 'blue')
                .style('stroke', 'black')
    }

    render() {
        const { size } = this.props;

        return <svg className="bc-barChart" ref={node => this.node = node} width={size[0]} height={size[1]}> </svg>
    }
}

export default BarChart;