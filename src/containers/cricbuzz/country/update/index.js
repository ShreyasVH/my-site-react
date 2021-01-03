import React, { Component } from 'react';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isLoaded: false
        };
        this.countryId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        const countryResponse = await CricBuzzUtils.getCountryByApi(this.countryId);
        let state = countryResponse.data;
        state.isLoaded = true;

        this.setState(state);

        Context.hideLoader();
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name
            }

            Context.showLoader();
            const updatePromise = CricBuzzUtils.updateCountry(this.countryId, payload);
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

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    isFormValid = () => {
        return !!this.state.name;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    isFormValid={this.isFormValid()}
                    onNameChange={this.handleNameChange}
                    onSubmit={this.handleSubmit}
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
