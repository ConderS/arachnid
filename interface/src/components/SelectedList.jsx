import React, { Component } from 'react';
import "../styles/components/selectedlist.css";

export class SelectedList extends Component {
    constructor(props) {
        super(props);

        this.renderCurrentDatum = this.renderCurrentDatum.bind(this);
    }
    
    renderCurrentDatum() {
        var { currentDatum, xAttr, yAttr } = this.props;
        
        return currentDatum.map((datum, index) => {
            
            const xVal = datum[xAttr];
            const yVal = datum[yAttr];

            const datumString = JSON.stringify(datum);
            
            const draggedClass = datum.dragged ? "al-dragged" : "al-dragged-onto";

            const classNameTxt = `al-list-item ${draggedClass}`;

            return (
                <li key={index} className={classNameTxt}>
                    <hr/>
                    <p className="al-info"><label>{xAttr}: </label>{xVal}</p>
                    <p className="al-info"><label>{yAttr}: </label>{yVal}</p>
                </li>
                );
        })
    }

    render() {
        
        return (
            <div id="al-container">
                <h3 className="menu-header">Selected Records</h3>
                {this.renderCurrentDatum()}
            </div>
            );
    }
}

export default SelectedList;