import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { updateData, updateDimensions, updateCurrentDatum, driveChartUpdate } from '../actions/index';
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
        driveChartUpdate
    }, dispatch);
}


function mapStateToProps({ dataPane }) {

    const { chartData, size, currentDatum, update } = dataPane;

    return {
        chartData,
        size,
        currentDatum,
        update
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);