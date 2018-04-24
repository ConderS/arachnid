import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { updateData, updateDimensions, updateCurrentDatum, driveChartUpdate, generateChart, processYelpMaxThreshold, processYelpData, addQF, clearQFList } from '../actions/index';
import DataPane from '../components/DataPane';
import Menu from '../components/Menu';

export class HomeContainer extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <div>
                <DataPane {...this.props} />
                <Menu {...this.props} />
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
        generateChart,
        processYelpMaxThreshold,
        addQF,
        clearQFList,
        processYelpData
    }, dispatch);
}


function mapStateToProps({ dataPane }) {

    const { 
        chartData, 
        size, 
        currentDatum, 
        xAttr, 
        yAttr, 
        updateChart, 
        chartType, 
        QFList } = dataPane;

    return {
        chartData, 
        size, 
        currentDatum, 
        xAttr, 
        yAttr, 
        updateChart, 
        chartType, 
        QFList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);