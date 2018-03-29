import React, { Component } from 'react';
import "../styles/components/attributelist.css";

export class AttributeList extends Component {
    constructor(props) {
        super(props);

        this.renderCurrentDatum = this.renderCurrentDatum.bind(this);
    }
    
    renderCurrentDatum() {
        var { currentDatum } = this.props;
        
        console.log("CURD: ", currentDatum, this.props.test);
        return currentDatum.map((datum, index) => {
            const stringDatum = JSON.stringify(datum);
            return (
                <li key={index}>{stringDatum}</li>
                );
        })
    }

    render() {
        
        return (
            <div id="al-container">
                <h3 className="al-header">Selected Records</h3>
                {this.renderCurrentDatum()}
            </div>
            );
    }
}

export default AttributeList;