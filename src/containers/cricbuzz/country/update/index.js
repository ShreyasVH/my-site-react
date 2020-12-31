import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.countryId = Utils.getUrlParam('id');
    }

    componentDidMount() {
        Context.showLoader();
        CricBuzzUtils.loadCountry(this.countryId);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if ((Object.keys(this.props.country).length > 0) && (Object.keys(prevProps.country).length === 0)) {
            this.setState(this.constructStateFromDetails());
        }
    }

    constructStateFromDetails = () => {
        let state = {};

        let country = this.props.country;
        state.name = country.name;

        return state;
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
        return this.state.name;
    };

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
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

function mapStateToProps(store) {
    return ({
        country: store.cric.country
    });
}

export default connect(mapStateToProps)(Update);
