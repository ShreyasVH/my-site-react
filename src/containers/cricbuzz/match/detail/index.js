import React, { Component } from 'react';
import { connect } from 'react-redux';

import MatchCore from './core';

import ContextUtils from '../../../../utils/context';
import Utils from '../../../../utils';
import CricBuzzUtils from "../../../../utils/cricbuzz";

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            stadiumSuggestions: []
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        const matchResponse = await CricBuzzUtils.getMatchDetails(Utils.getUrlParam('id'));
        const match = matchResponse.data;

        let state = match;
        const stadiumsResponse = await CricBuzzUtils.getAllStadiums();
        const allStadiums = stadiumsResponse.data;
        let stadiumMap = {};
        allStadiums.forEach(stadium => {
            stadiumMap[stadium.id] = stadium;
        });
        state.stadiumMap = stadiumMap;

        const teamsResponse = await CricBuzzUtils.getAllTeams();
        const allTeams = teamsResponse.data.map(team => ({
            id: team.id,
            name: team.name
        }));
        let teamMap = {};
        allTeams.forEach(team => {
           teamMap[team.id] = team.name;
        });
        state.teamMap = teamMap;

        const countryResponse = await CricBuzzUtils.getAllCountries();
        const allCountries = countryResponse.data.map(country => ({
            id: country.id,
            name: country.name
        }));
        let countryMap = {};
        allCountries.forEach(country => {
            countryMap[country.id] = country.name
        });
        state.countryMap = countryMap;

        const allPlayers = (await CricBuzzUtils.getAllPlayers()).map(team => ({
            id: team.id,
            name: team.name
        }));
        let playerMap = {};
        allPlayers.forEach(player => {
            playerMap[player.id] = player.name;
        });
        state.playerMap = playerMap;

        const seriesResponse = await CricBuzzUtils.getSeriesByApi(match.series);
        const series = seriesResponse.data;
        state.seriesName = series.name;
        state.gameType = series.gameType;

        state.dismissalMap = {
            1: 'Bowled',
            2: 'Caught',
            3: 'LBW',
            4: 'Run Out',
            5: 'Stumped',
            6: 'Hit Twice',
            7: 'Hit Wicket',
            8: 'Obstructing the Field',
            9: 'Timed Out',
            10: 'Retired Hurt',
            11: 'Handled the Ball'
        };

        state.isLoaded = true;
        this.setState(state);
        ContextUtils.hideLoader();
    }

    render() {
        return (
            <MatchCore
                {...this.state}
            />
        );
    }
}
