import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { updateData, updateDimensions, updateCurrentDatum, driveChartUpdate, testUpdate } from '../actions/index';
import DataPane from '../components/DataPane';
import Menu from '../components/Menu';

export class HomeContainer extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <div>
                <Menu {...this.props} />
                <DataPane {...this.props} />
            </div>
            );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        updateData,
        updateDimensions,
        updateCurrentDatum,
        driveChartUpdate,
        testUpdate
    }, dispatch);
}


function mapStateToProps({ dataPane }) {

    const { chartData, size, currentDatum, update, test } = dataPane;

    return {
        chartData,
        size,
        currentDatum,
        update,
        test
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);