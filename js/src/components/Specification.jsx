import React, { Component } from 'react';
import '../styles/components/specification.css';

// Gives interactive list of quality functions
export class Specification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sp-container">
                <h3 className="menu-header">Quality Functions</h3>
                <hr/>
                
            </div>
            );
    }
}

export default Specification;