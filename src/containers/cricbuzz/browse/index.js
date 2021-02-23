import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseCore from './core';

import ContextUtils from '../../../utils/context';
import CricUtils from '../../../utils/cricbuzz';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tours: [],
            isLoaded: false
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        const year = CricUtils.getYearForBrowse();

        let tours = [];
        let loadingEnded = false;
        const count = 20;
        let offset = 0;

        while (!loadingEnded) {
            const batchTours = await CricUtils.getTours(year, offset, count);
            tours = tours.concat(batchTours);
            loadingEnded = batchTours.length < count;
            offset += count;
        }

        this.setState({
            tours,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    setTour = id => {
        ContextUtils.showLoader();
        this.props.history.push('/cricbuzz/tours/detail?id=' + id);
    };

    render() {
        return (
            <BrowseCore
                {...this.state}
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
