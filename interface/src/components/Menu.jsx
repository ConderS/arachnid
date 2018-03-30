import React, { Component } from 'react';
//Since this is a sub-container, stylings are in index.css

import Specification from './Specification';
import AttributeList from './AttributeList';

export class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-container">
                <AttributeList {...this.props} />
                <Specification {...this.props} />

            </div>

            );
    }

}

export default Menu;