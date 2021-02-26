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

        const years = await CricUtils.getYears();

        await this.loadTours(CricUtils.getYearForBrowse());

        this.setState({
            years,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const year = CricUtils.getYearForBrowse();
        if (year !== this.state.year) {
            ContextUtils.showLoader();
            await this.loadTours(year);
            ContextUtils.hideLoader();
        }
    }

    loadTours = async year => {
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
            year
        });
    };

    setTour = id => {
        ContextUtils.showLoader();
        this.props.history.push('/cricbuzz/tours/detail?id=' + id);
    };

    setYear = year => {
        if (this.state.year !== year) {
            this.props.history.push('/cricbuzz/browse?year=' + year);
        }
    };

    render() {
        return (
            <BrowseCore
                {...this.state}
                onClickTour={this.setTour}
                onYearClick={this.setYear}
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
