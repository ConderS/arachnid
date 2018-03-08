import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { updateData } from '../actions/index';
import DataPane from '../components/DataPane.js';

export class HomeContainer extends Component {
    render() {
        return (
            <div>
                <DataPane {...this.props} />
            </div>
            );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        updateData
    }, dispatch);
}


function mapStateToProps({ dataPane }) {

    const { chartData, size, update } = dataPane;

    return {
        chartData,
        size,
        update
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);