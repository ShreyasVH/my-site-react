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
            countries: [],
            state: '',
            city: '',
            isLoaded: false,
            countrySuggestions: []
        };
        this.stadiumId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        const stadiumResponse = await CricBuzzUtils.getStadiumByApi(this.stadiumId);
        const stadium = stadiumResponse.data;
        let state = {
            id: stadium.id,
            name: stadium.name,
            countryId: stadium.country.id,
            countryName: stadium.country.name,
            state: stadium.state,
            city: stadium.city
        };

        const countriesResponse = await CricBuzzUtils.getAllCountries();
        state.countries = countriesResponse.data;

        state.isLoaded = true;

        this.setState(state);
        Context.hideLoader();
    }

    handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            name: this.state.name,
            countryId: this.state.countryId,
            state: this.state.state,
            city: this.state.city
        }

        Context.showLoader();
        const updatePromise = CricBuzzUtils.updateStadium(this.stadiumId, payload);
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

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleCityChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.city = event.target.value;
        this.setState(updatedState);
    };

    handleStateChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.state = event.target.value;
        this.setState(updatedState);
    };

    handleCountrySelect = (id, name) => {
        this.setState({
            countryId: id,
            countryName: name,
            countrySuggestions: []
        });
    };

    handleCountrySearch = event => {
        let keyword = event.target.value;
        let countrySuggestions = [];
        if (keyword.length > 2) {
            countrySuggestions = this.state.countries.filter(country => (country.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            countrySuggestions
        })
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateCountry().isValid);

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

    validateCountry = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.countryId) {
            response.isValid = false;
            response.message = 'Country cannot be empty';
        }

        return response;
    }

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onCityChange={this.handleCityChange}
                    onStateChange={this.handleStateChange}
                    onCountrySelect={this.handleCountrySelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName}
                    validateCountry={this.validateCountry}
                    onCountrySearch={this.handleCountrySearch}
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