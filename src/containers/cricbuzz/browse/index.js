import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseCore from './core';

import ContextUtils from '../../../utils/context';
import CricUtils from '../../../utils/cricbuzz';

class Browse extends Component {
    componentDidMount() {
        ContextUtils.showLoader();
        CricUtils.loadTours();
    }

    handleScroll = () => {
        ContextUtils.showLoader();
        CricUtils.loadTours();
    };

    setTour = id => {
        ContextUtils.showLoader();
        this.props.history.push('/cricbuzz/tours/detail?id=' + id);
    };

    render() {
        return (
            <BrowseCore
                {...this.props}
                onScroll={this.handleScroll}
                onClickTour={this.setTour}
            />
        );
    }
}

function mapStateToProps(store) {
    return ({
        tours: store.cric.tours,
        hasReachedEnd: store.cric.hasReachedEnd
    });
}

export default connect(mapStateToProps)(Browse);
