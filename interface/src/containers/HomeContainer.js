import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import DataPane from '../components/DataPane.js';

export class HomeContainer extends Component {
    render() {
        return (
            <div>
                <DataPane />
            </div>
            );
    }
}

export default HomeContainer;