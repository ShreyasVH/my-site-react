import React, { Component } from 'react';

import CreateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import Helmet from "react-helmet";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.countryId = Utils.getUrlParam('id');
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name
            }

            Context.showLoader();
            const updatePromise = CricBuzzUtils.createCountry(this.countryId, payload);
            updatePromise.then(apiResponse => {
                Context.hideLoader();
                Context.showNotify('Created Successfully', 'success');
            }).catch(apiResponse => {
                Context.hideLoader();
                let message = 'Failed to update. Please try again';
                if (apiResponse.response) {
                    const errorCode = apiResponse.response.data.code;
                    if (4004 === errorCode) {
                        message = apiResponse.response.data.description;
                    }
                    console.log(apiResponse.response.status);
                    console.log(apiResponse.response.data);
                }
                Context.showNotify(message, 'error');
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
        return (
            <div>
                <Helmet
                    title="Create Country - Howzzat"
                />

                <CreateCore
                    {...this.state}
                    isFormValid={this.isFormValid()}
                    onNameChange={this.handleNameChange}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}
