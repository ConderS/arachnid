import React, { Component } from 'react';
import '../styles/components/qf.css';

export class QF extends Component {
    constructor(props) {
        super(props);

        this.renderQF = this.renderQF.bind(this);
        this.renderMaxThreshold = this.renderMaxThreshold.bind(this);
        this.renderDedupTwo = this.renderDedupTwo.bind(this);
        this.confirmQF = this.confirmQF.bind(this);
        this.renderDeleteOne = this.renderDeleteOne.bind(this);
    }

    renderQF() {
        const { type } = this.props.body;

        switch(type) {
            case "Max_Threshold":
                return this.renderMaxThreshold();
            case "Dedup_Two":
                return this.renderDedupTwo();
            case "Delete_One":
                return this.renderDeleteOne();
            default:
                return (<div>Error!</div>);
        }
    }
    
    renderMaxThreshold() {
        const { handleConfirmQF } = this.props;
        const { pursue, attribute } = this.props.body;

        return (
            <div className="subQFContainer">
                <hr />
                <p className="max-threshold-txt">Max Threshold on:</p> 
                <p className="qf-value qf-attribute">{ attribute }</p>
                <p className="max-threshold-txt">Threshold Value:</p> 
                <p className="qf-value qf-pursue">{ pursue }</p>
                <p>Transformation Template: </p>
                <hr className="qf-line" />
                <button className="btn btn-info qf-btn" onClick={this.confirmQF}>Confirm</button>
            </div>
            )
    }

    renderDedupTwo() {
        const { handleConfirmQF } = this.props;
        const { pursue, attribute } = this.props.body;
        
        console.log("pursue: ", pursue);
        return (
            <div className="subQFContainer">
                <hr />
                <p className="max-threshold-txt">Dedup on:</p> 
                <p className="qf-value qf-attribute">{ attribute }</p>

                <label className="">Duplicate Record, Clean Record</label>

                <p className="no-space-mb-1 dirty-txt">{ pursue[0].business_id }, { pursue[0].review_count }</p>
                <p className="qf-value qf-pursue">{ pursue[1].business_id }, { pursue[1].review_count }</p>

                <label>Transformation Template: </label>

                <hr className="qf-line" />
                <button className="btn btn-info qf-btn" onClick={this.confirmQF}>Confirm</button>
            </div>
            )
    }

    renderDeleteOne() {
        const { handleConfirmQF } = this.props;
        const { pursue, attribute } = this.props.body;
        
        console.log("pursue: ", pursue);
        return (
            <div className="subQFContainer">
                <hr />
                <p className="max-threshold-txt">Delete on:</p> 
                <p className="qf-value qf-attribute">{ attribute }</p>

                <label className="">Delete Record</label>

                <p className="no-space-mb-1 dirty-txt">{ pursue[0].business_id }, { pursue[0].review_count }</p>

                <label>Transformation Template: </label>

                <hr className="qf-line" />
                <button className="btn btn-info qf-btn" onClick={this.confirmQF}>Confirm</button>
            </div>
            )   
    }

    confirmQF() {
        this.props.handleConfirmQF(this.props.body);
    }

    render() {
        return (
            <div id="maxThresholdQF" className="QFContainer">
                {this.renderQF()}
            </div>
            );
    }
}

export default QF;