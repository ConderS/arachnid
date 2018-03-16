import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { updateData, updateDimensions, updateCurrentDatum } from '../actions/index';
import DataPane from '../components/DataPane';

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
        updateData,
        updateDimensions,
        updateCurrentDatum
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