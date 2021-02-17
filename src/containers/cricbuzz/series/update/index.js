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
            types: [
                {
                    id: 0,
                    name: 'BI_LATERAL'
                },
                {
                    id: 1,
                    name: 'TRI_SERIES'
                },
                {
                    id: 2,
                    name: 'TOURNAMENT'
                }
            ],
            gameTypes: [
                {
                    id: 0,
                    name: 'ODI'
                },
                {
                    id: 1,
                    name: 'TEST'
                },
                {
                    id: 2,
                    name: 'T20'
                }
            ],
            teamSuggestions: [],
            playerSuggestions: [],
            isLoaded: false,
            countrySuggestions: [],
            teams: [],
            manOfTheSeriesList: []
        };
        this.seriesId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const countriesResponse = await CricBuzzUtils.getAllCountries();
            const countries = countriesResponse.data;
            state.countries = countries.map(country => ({
                id: country.id,
                name: country.name
            }));

            const teamsResponse = await CricBuzzUtils.getAllTeams();
            state.allTeams = teamsResponse.data.map(team => ({
                id: team.id,
                name: team.name
            }));

            const players = await CricBuzzUtils.getAllPlayers();
            state.allPlayers = players.map(player => ({
                id: player.id,
                name: player.name
            }));

            const seriesResponse = await CricBuzzUtils.getSeriesByApi(this.seriesId);
            const series = seriesResponse.data;

            state.name = series.name;
            state.homeCountryId = series.homeCountry.id;
            state.homeCountryName = series.homeCountry.name;
            state.type = series.type;
            state.gameType = series.gameType;
            state.startTime = series.startTime;
            state.teams = series.teams.map(team => ({
                id: team.id,
                name: team.name
            }));
            state.manOfTheSeriesList = series.manOfTheSeriesList.map(mots => ({
                id: mots.playerId,
                name: mots.playerName,
                teamId: mots.teamId
            }));
        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;
        this.setState(state);
        Context.hideLoader();
    }

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateCountry());
        isValid = (isValid && this.validateType());
        isValid = (isValid && this.validateGameType());
        isValid = (isValid && this.validateStartTime());
        isValid = (isValid && this.validateTeams().isValid);

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

    validateTeams = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (this.state.teams.length < 2) {
            response.isValid = false;
            response.message = 'There must be at least 2 teams';
        } else if (
            (('BI_LATERAL' === this.state.type) && (this.state.teams.length !== 2))
            ||
            (('TRI_SERIES' === this.state.type) && (this.state.teams.length !== 3))
        ) {
            response.isValid = false;
            response.message = 'Team count conflicts with series type';
        }

        return response;
    };

    validateCountry = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.homeCountryId) {
            response.isValid = false;
            response.message = 'Home Country cannot be empty';
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

    validateGameType = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.gameType) {
            response.isValid = false;
            response.message = 'Game Type cannot be empty';
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

    handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            name: this.state.name,
            homeCountryId: this.state.homeCountryId,
            type: this.state.type,
            gameType: this.state.gameType,
            startTime: this.state.startTime,
            teams: this.state.teams.map(team => team.id),
            manOfTheSeriesList: this.state.manOfTheSeriesList.map(mots => ({
                playerId: mots.id,
                teamId: mots.teamId
            }))
        };

        if (this.isFormValid()) {
            Context.showLoader();
            const updatePromise = CricBuzzUtils.updateSeries(this.seriesId, payload);
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

    handleNameChange = (event) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    };

    handleHomeCountrySelect = (id, name) => {
        this.setState({
            homeCountryId: id,
            homeCountryName: name,
            countrySuggestions: []
        });
    };

    handleTypeSelect = (id, name) => {
        this.setState({
            type: name
        });
    };

    handleGameTypeSelect = (id, name) => {
        this.setState({
            gameType: name
        });
    };

    handleTeamSelect = (id, name) => {
        let updatedState = Utils.copyObject(this.state);
        let teamIds = updatedState.teams.map(team => team.id);
        if (teamIds.indexOf(id) === -1) {
            updatedState.teams.push({
                id,
                name
            });
            updatedState.teamSuggestions = [];
            this.setState(updatedState);
        }
    };

    handleTeamSelectForMOTS = (id, name) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.teamNameForMOTS = name;
        updatedState.teamIdForMOTS = id;
        this.setState(updatedState);
    };

    handlePlayerSelectForMOTS = (id, name) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.playerNameForMOTS = name;
        updatedState.playerIdForMOTS = id;
        updatedState.playerSuggestions = [];
        this.setState(updatedState);
    };

    handleTeamRemove = (teamId) => {
        let updatedState = Utils.copyObject(this.state);
        let index = -1;

        for (let i in updatedState.teams) {
            let team = updatedState.teams[i];
            if (teamId === team.id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            updatedState.teams.splice(index, 1);

            let validTeamIds = updatedState.teams.map(team => team.id);
            updatedState.manOfTheSeriesList = updatedState.manOfTheSeriesList.filter(mots => (validTeamIds.indexOf(mots.teamId) !== -1));

            this.setState(updatedState);
        }
    };

    handleManOfTheSeriesRemove = (playerId) => {
        let updatedState = Utils.copyObject(this.state);

        let manOfTheSeriesIds = updatedState.manOfTheSeriesList.map(mots => mots.id);
        let index = manOfTheSeriesIds.indexOf(playerId);
        if (-1 !== index) {
            updatedState.manOfTheSeriesList.splice(index, 1);

            this.setState(updatedState);
        }
    };

    handlePlayerSearch = event => {
        let keyword = event.target.value;

        let allPlayers = this.state.allPlayers;
        let playerSuggestions = [];
        if (keyword.length > 2) {
            playerSuggestions = allPlayers.filter(player => (player.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            playerSuggestions
        });
    };

    handleTeamSearch = event => {
        let keyword = event.target.value;

        let allTeams = this.state.allTeams;
        let teamSuggestions = [];
        if (keyword.length > 2) {
            teamSuggestions = allTeams.filter(team => (team.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            teamSuggestions
        });
    };

    handleCountrySearch = event => {
        let keyword = event.target.value;

        let allCountries = this.state.countries;
        let countrySuggestions = [];
        if (keyword.length > 2) {
            countrySuggestions = allCountries.filter(country => (country.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            countrySuggestions
        });
    };

    handleManOfTheSeriesPick = () => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.manOfTheSeriesList.push({
            id: updatedState.playerIdForMOTS,
            name: updatedState.playerNameForMOTS,
            teamId: updatedState.teamIdForMOTS
        });
        updatedState.playerIdForMOTS = '';
        updatedState.playerNameForMOTS = '';
        updatedState.teamIdForMOTS = '';
        updatedState.teamNameForMOTS = '';

        this.setState(updatedState);
    };


    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onSubmit={this.handleSubmit}
                    onStartTimeChange={this.handleStartTimeChange}
                    onNameChange={this.handleNameChange}
                    onHomeCountrySelect={this.handleHomeCountrySelect}
                    onTypeSelect={this.handleTypeSelect}
                    onGameTypeSelect={this.handleGameTypeSelect}
                    onTeamSelect={this.handleTeamSelect}
                    onTeamSelectForMOTS={this.handleTeamSelectForMOTS}
                    onPlayerSelectForMOTS={this.handlePlayerSelectForMOTS}
                    onTeamRemove={this.handleTeamRemove}
                    onManOfTheSeriesRemove={this.handleManOfTheSeriesRemove}
                    onPlayerSearch={this.handlePlayerSearch}
                    onManOfTheSeriesPick={this.handleManOfTheSeriesPick}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateCountry={this.validateCountry()}
                    validateTeams={this.validateTeams()}
                    validateType={this.validateType()}
                    validateGameType={this.validateGameType()}
                    validateStartTime={this.validateStartTime()}
                    onTeamSearch={this.handleTeamSearch}
                    onCountrySearch={this.handleCountrySearch}
                />
            );
        }
    };

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}