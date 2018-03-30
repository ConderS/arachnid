import React, { Component } from 'react';
import '../styles/components/specification.css';

// The interactive part of the menu 
export class Specification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sp-container">
                <h3 className="sp-header">Quality Functions</h3>
                <hr/>
            </div>
            );
    }
}

export default Specification;