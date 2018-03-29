import React, { Component } from 'react';

import Specification from './Specification';
import AttributeList from './AttributeList';

export class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AttributeList {...this.props} />
            );
    }

}

export default Menu;