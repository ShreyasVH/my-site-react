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
            name: '',
            countries: [],
            types: [
                {
                    id: 0,
                    name: 'INTERNATIONAL'
                },
                {
                    id: 1,
                    name: 'DOMESTIC'
                },
                {
                    id: 2,
                    name: 'FRANCHISE'
                }
            ],
            type: '',
            countrySuggestions: [],
            isLoaded: false
        };
        this.teamId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const teamResponse = await CricBuzzUtils.getTeamByApi(this.teamId);
            const team = teamResponse.data;
            state = {
                id: team.id,
                name: team.name,
                countryId: team.country.id,
                countryName: team.country.name,
                type: team.teamType
            };
            const countriesResponse = await CricBuzzUtils.getAllCountries();
            state.countries = countriesResponse.data;
        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded =  true;

        this.setState(state);
        Context.hideLoader();
    }

    handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            name: this.state.name,
            countryId: this.state.countryId,
            teamType: this.state.type
        };

        if (this.isFormValid()) {
            Context.showLoader();
            const updatePromise = CricBuzzUtils.updateTeam(this.teamId, payload);
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

    handleTypeSelect = (id, name) => {
        this.setState({
            type: name
        });
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateCountry().isValid);
        isValid = (isValid && this.validateType().isValid);

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

    validateType = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.type) {
            response.isValid = false;
            response.message = 'Type cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onCountrySearch={this.handleCountrySearch}
                    onCountrySelect={this.handleCountrySelect}
                    onTypeSelect={this.handleTypeSelect}
                    isFormValid={this.isFormValid()}
                    onSubmit={this.handleSubmit}
                    nameError={this.validateName().message}
                    countryError={this.validateCountry().message}
                    typeError={this.validateType().message}
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
        team: store.cric.team
    });
}

export default connect(mapStateToProps)(Update);
