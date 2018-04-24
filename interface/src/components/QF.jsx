import React, { Component } from 'react';
import '../styles/components/qf.css';

export class QF extends Component {
    constructor(props) {
        super(props);

        this.renderQF = this.renderQF.bind(this);
        this.renderMaxThreshold = this.renderMaxThreshold.bind(this);
        this.handleConfirmQF = this.handleConfirmQF.bind(this);
    }

    renderQF() {
        const { type } = this.props.body;

        switch(type) {
            case "Max_Threshold":
                return this.renderMaxThreshold();
        }
    }
    
    renderMaxThreshold() {
        const { pursueValue, attribute } = this.props.body;

        return (
            <div id="maxThresholdQF" className="QFContainer">
                <p>Max Threshold on { attribute }: </p>
                <p>{ pursueValue }</p>
                <p>Transformation Template: </p>
                <button className="btn-info" onClick={this.handleConfirmQF}>Confirm</button>
            </div>
            )
    }

    handleConfirmQF() {
        const { pursueValue, attribute, compute, chartData } = this.props.body;
        
        const data = {
            chartData: chartData,
            thresholdValue: pursueValue,
            attr: attribute
        }

        compute(data);
    }

    render() {
        return (
            {this.renderQF()}
            );
    }
}

export default QF;