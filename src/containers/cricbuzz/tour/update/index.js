import React, { Component } from 'react';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        this.tourId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const tourResponse = await CricBuzzUtils.getTourByApi(this.tourId);
            let tour = tourResponse.data;
            state.name = tour.name;
            state.startTime = tour.startTime;

        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }
        state.isLoaded = true;

        this.setState(state);
        Context.hideLoader();
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
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
        }
    };

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    }

    handleNameChange = (event) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    }

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateStartTime().isValid);

        return isValid;
    };

    validateName = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.name) {
            response.isValid = false;
            response.message = 'Name cannot be empty';
        }

        return response;
    };

    validateStartTime = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.startTime) {
            response.isValid = false;
            response.message = 'Start Time cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onSubmit={this.handleSubmit}
                    onStartTimeChange={this.handleStartTimeChange}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateStartTime={this.validateStartTime()}
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