import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeriesCore from './core';

import CricUtils from '../../../../utils/cricbuzz';
import ContextUtils from '../../../../utils/context';
import Utils from '../../../../utils';

class Series extends Component {
    componentDidMount = () => {
        ContextUtils.showLoader();
        CricUtils.loadSeries(Utils.getUrlParam('id'));
    };

    handleMatchClick = id => {
        ContextUtils.showLoader();
        CricUtils.setMatch(CricUtils.getMatch(id));

        this.props.history.push('/cricbuzz/matches/detail?id=' + id);
    };

    render() {
        return (
            <SeriesCore
                {...this.props}
                onClickMatch={this.handleMatchClick}
            />
        );
    }
}

function mapStateToProps(state) {
    return ({
        series: state.cric.series
    });
}

export default connect(mapStateToProps)(Series);