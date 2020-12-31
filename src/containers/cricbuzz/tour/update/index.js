import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.tourId = Utils.getUrlParam('id');
    }

    componentDidMount() {
        Context.showLoader();
        CricBuzzUtils.loadTour(this.tourId);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if ((Object.keys(this.props.tour).length > 0) && (Object.keys(prevProps.tour).length === 0)) {
            this.setState(this.constructStateFromDetails());
        }
    }

    constructStateFromDetails = () => {
        let state = {};

        let tour = this.props.tour;
        state.name = tour.name;
        state.startTime = tour.startTime;

        return state;
    }

    handleSubmit = async event => {
        event.preventDefault();
        // Context.showLoader();
        // await response = CricBuzzUtils.updateSeries()
        let payload = {
            name: this.state.name,
            startTime: this.state.startTime
        }
        Context.showLoader();
        const updatePromise = CricBuzzUtils.updateTour(this.tourId, payload);
        updatePromise.then(apiResponse => {
            Context.hideLoader();
            Context.showNotify('Updated Successfully', 'success');
        }).catch(apiResponse => {
            Context.hideLoader();
            if (apiResponse.response) {
                console.log(apiResponse.response.status);
                console.log(apiResponse.response.data);
            }
            Context.showNotify('Failed to update. Please try again', 'error');
        });
    };

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    }

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
            return (
                <UpdateCore
                    {...this.state}
                    onSearch={this.handleSearch}
                    onSubmit={this.handleSubmit}
                    onStartTimeChange={this.handleStartTimeChange}
                />
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return ({
        tour: store.cric.tour
    });
}

export default connect(mapStateToProps)(Update);
