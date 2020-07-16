import React, { Component } from 'react';
import { connect } from 'react-redux';

import MatchCore from './core';

import ContextUtils from '../../../../utils/context';
import CricUtils from '../../../../utils/cricbuzz';
import Utils from '../../../../utils';

class Match extends Component {
    componentDidMount() {
        ContextUtils.showLoader();
        CricUtils.loadMatch(Utils.getUrlParam('id'));
    }

    render() {
        return (
            <MatchCore
                {...this.props}
            />
        );
    }
}

function mapStateToProps(store) {
    return ({
        match: store.cric.match
    });
}

export default connect(mapStateToProps)(Match);