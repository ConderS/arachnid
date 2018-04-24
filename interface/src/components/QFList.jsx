import React, { Component } from 'react';
import '../styles/components/specification.css';

import QF from './QF';

// Gives interactive list of quality functions
export class QFList extends Component {
    constructor(props) {
        super(props);

        this.renderQFList = this.renderQFList.bind(this);
    }

    renderQFList() {
        const { addQF, QFList, chartData } = this.props;

        if (!QFList.length) {
            return (<div className="emptyQFList">Awaiting Interactions...</div>);
        }

        return QFList.map((qf, index) => {
            return (<QF 
                body = { qf }
                chartData = { chartData}
            />);
        });

    }
    
    //Do we build different QF components and call them in, or have all the logic centered in a single generic QF component (Rendering different elements based on a switch-case with qf.type)?
    renderMaxThreshold(qf) {

    }

    render() {
        return (
            <div className="sp-container">
                <h3 className="menu-header">Quality Functions</h3>
                <hr/>
                {this.renderQFList()}
            </div>
            );
    }
}

export default QFList;