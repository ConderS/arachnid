import React, { Component } from 'react';
import '../styles/components/qflist.css';

import QF from './QF';

// Gives interactive list of quality functions
export class QFList extends Component {
    constructor(props) {
        super(props);

        this.renderQFList = this.renderQFList.bind(this);
        this.handleConfirmQF = this.handleConfirmQF.bind(this);
    }

    handleConfirmQF(qf) {
        console.log("Computing QF...");

        const { chartData, clearQFList, processYelpData, processYelpMaxThreshold } = this.props;

        const data = {
            chartData: chartData,
            pursue: qf.pursue,
            attr: qf.attribute,
            type: qf.type
        }
        
        switch(qf.type) {
            case "Max_Threshold":
                processYelpMaxThreshold(data);
                break;
            case "Dedup_Two":
                processYelpData(data);
                break;
            case "Delete_One":
                processYelpData(data);
                break;
            default:
                break;
        };

        // clearQFList();
    }

    renderQFList() {
        const { addQF, QFList, chartData } = this.props;

        if (!QFList.length) {
            return (
                <div className="emptyQFList">
                    <hr/>
                    <p>Awaiting Specifications....</p>
                </div>
                );
        }

        return QFList.map((qf, index) => {
            return (<QF 
                key = { index }
                body = { qf }
                handleConfirmQF = { this.handleConfirmQF }
            />);
        });

    }
    
    //Do we build different QF components and call them in, or have all the logic centered in a single generic QF component (Rendering different elements based on a switch-case with qf.type)?
    renderMaxThreshold(qf) {

    }

    render() {
        return (
            <div className="qflist-container">
                <h3 className="menu-header">Quality Functions</h3>
                {this.renderQFList()}
            </div>
            );
    }
}

export default QFList;