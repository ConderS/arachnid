import React, { Component } from 'react';
import '../styles/components/variableslist.css';

export class VariablesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="vl-container">
                <h3 className="menu-header">Variables List</h3>
                <hr/>
            </div>
            );
    }
}

export default VariablesList;