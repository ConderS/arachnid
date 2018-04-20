import React, { Component } from 'react';
import '../styles/components/specification.css';

import QF from './QF';

// Gives interactive list of quality functions
export class Specification extends Component {
    constructor(props) {
        super(props);

        this.renderQFList = this.renderQFList.bind(this);
    }

    renderQFList() {
        return (
            <QF />
            );
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

export default Specification;