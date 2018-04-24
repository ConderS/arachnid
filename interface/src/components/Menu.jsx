import React, { Component } from 'react';
import '../styles/components/menu.css';

import QFList from './QFList';
import SelectedList from './SelectedList';
import VariablesList from './VariablesList';

export class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu-container">
                <SelectedList {...this.props} />
                <QFList {...this.props} />
                <VariablesList {...this.props} />
            </div>

            );
    }

}

export default Menu;