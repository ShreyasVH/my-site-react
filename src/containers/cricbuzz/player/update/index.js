import React, { Component } from 'react';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import ApiHelper from "../../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            countries: [],
            countrySuggestions: [],
            dateOfBirth: '',
            imageUrl: '',
            imageFile: '',
            imageName: '',
            isLoaded: false
        };
        this.playerId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const playerResponse = await CricBuzzUtils.getPlayerByApi(this.playerId);

            let player = playerResponse.data;
            state = {
                name: player.name,
                dateOfBirth: player.dateOfBirth,
                countryId: player.country.id,
                countryName: player.country.name,
                imageUrl: player.image
            };

            const countriesResponse = await CricBuzzUtils.getAllCountries();
            state.countries = countriesResponse.data;

            let playerImageParts = player.image.split('/');
            state.imageName = playerImageParts[playerImageParts.length - 1];
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
                countryId: this.state.countryId,
                dateOfBirth: this.state.dateOfBirth
            }

            Context.showLoader();

            if (this.state.imageFile) {
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'cric', 'player_' + this.playerId);
                let response = uploadResponse.data;
                payload.image = response.secure_url;
            }

            const updatePromise = CricBuzzUtils.updatePlayer(this.playerId, payload);
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

            this.allCountries = (await CricBuzzUtils.getAllCountries()).map(country => ({
                id: country.id,
                name: country.name
            }));
        }
    };

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleDateOfBirthChange = event => {
        const dateOfBirth = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.dateOfBirth = dateOfBirth;
        this.setState(updatedState);
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

    handleCountrySelect = (id, name) => {
        this.setState({
            countryId: id,
            countryName: name,
            countrySuggestions: []
        });
    }

    handleImageSelect = (file) => {
        this.setState({
            imageFile: file,
            imageName: file.name
        });
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateCountry().isValid);
        isValid = (isValid && this.validateDateOfBirth().isValid);

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
    };

    validateDateOfBirth = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.dateOfBirth) {
            response.isValid = false;
            response.message = 'Date of birth cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onDateOfBirthChange={this.handleDateOfBirthChange}
                    onCountrySearch={this.handleCountrySearch}
                    onCountrySelect={this.handleCountrySelect}
                    onImageSelect={this.handleImageSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateCountry={this.validateCountry()}
                    validateDateOfBirth={this.validateDateOfBirth()}
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
