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
            type: ''
        };
        this.teamId = Utils.getUrlParam('id');
    }

    componentDidMount() {
        Context.showLoader();
        CricBuzzUtils.loadTeam(this.teamId);
        const countriesResponse = CricBuzzUtils.getAllCountries();
        countriesResponse.then(apiResponse => {
            const countries = apiResponse.data;
            this.setState({
                countries
            })
        }).catch(apiResponse => {
            console.log(apiResponse.data);
        });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if ((Object.keys(this.props.team).length > 0) && (Object.keys(prevProps.team).length === 0)) {
            this.setState(this.constructStateFromDetails());
        }
    }

    constructStateFromDetails = () => {
        let state = {};

        let team = this.props.team;
        state.name = team.name;
        state.countryId = team.country.id;
        state.countryName = team.country.name;
        state.type = team.teamType

        return state;
    }

    handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            name: this.state.name,
            countryId: this.state.countryId,
            type: this.state.type
        }

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
    };

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleCountrySelect = (id, name) => {
        this.setState({
            countryId: id,
            countryName: name
        });
    }

    handleTypeSelect = (id, name) => {
        this.setState({
            type: name
        });
    }

    isFormValid = () => {
        return this.state.name;
    };

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onCountrySelect={this.handleCountrySelect}
                    onTypeSelect={this.handleTypeSelect}
                    isFormValid={this.isFormValid()}
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
        team: store.cric.team
    });
}

export default connect(mapStateToProps)(Update);
