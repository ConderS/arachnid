import React, { Component } from 'react';

import '../styles/components/scatterplot.css';

export class ScatterPlot extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spaceOffset: 300
        }

        this.createScatterPlot = this.createScatterPlot.bind(this);
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
    }

    createScatterPlot() {
        const { chartData, size } = this.props;
        const node = this.node;
        
        // WRITE HERE
        // The rest of the D3 code goes here, just select(node) to select the svg
    }

    render() {
        const { size } = this.props;
        const { spaceOffset } = this.state;

        return <svg className="sp" ref={node => this.node = node} width={size[0] + spaceOffset} height={size[1] + spaceOffset}> </svg>
    }
}

export default ScatterPlot;