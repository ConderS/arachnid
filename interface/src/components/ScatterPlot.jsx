import React, { Component } from 'react';

import '../styles/components/scatterplot.css';

export class ScatterPlot extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spaceOffset: 300
        }

        //Binding your functions sets the "this" context to that of the class, not the function itself (so you can call "this.state" and "this._OTHER_FUNCTION")
        // Whenever you create a new function in the component and you want it to be able to refer to outside functions and the state/props, you bind it like so here.
        this.createScatterPlot = this.createScatterPlot.bind(this);
        this.someEventHandler = this.someEventHandler.bind(this);
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

    someEventHandler() {

        /* Props is a global state.
        
         updateCurrentDatum = a function that stores an ARRAY of selected data, or in this case, yelp records. When called, does not reset the viz. 
        
         currentDatum = the current array of selected data/yelp records

         currentDatum will be empty if you haven't updated it with "updateCurrentDatum" previously.

         updateData = updates the data of the viz. Will RESET the viz with the new data
        */
       
        const { updateData, updateCurrentDatum, currentDatum } = this.props;

    }

    render() {
        const { size } = this.props;
        const { spaceOffset } = this.state;

        return <svg className="sp" ref={node => this.node = node} width={size[0] + spaceOffset} height={size[1] + spaceOffset}> </svg>
    }
}

export default ScatterPlot;