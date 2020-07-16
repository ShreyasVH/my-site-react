import React, { Component } from 'react';
import { connect } from 'react-redux';

import TourCore from './core';

import CricUtils from '../../../../utils/cricbuzz';
import ContextUtils from '../../../../utils/context';
import Utils from '../../../../utils';

class Tour extends Component {
    componentDidMount = () => {
        ContextUtils.showLoader();
        CricUtils.loadTour(Utils.getUrlParam('id'));
    };

    setSeries = id => {
        ContextUtils.showLoader();
        CricUtils.setSeries(CricUtils.getSeries(id));

        this.props.history.push('/cricbuzz/series/detail?id=' + id);
    };

    render() {
        return (
            <TourCore
                {...this.props}
                onClickSeries={this.setSeries}
            />
        );
    }
}

function mapStateToProps(state) {
    return ({
        tour: state.cric.tour
    });
}

export default connect(mapStateToProps)(Tour);