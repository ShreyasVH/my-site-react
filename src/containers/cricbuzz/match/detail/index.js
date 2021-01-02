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
        let allStadiums = stadiumsResponse.data;
        state.stadiumMap = allStadiums.reduce((map, stadium) => {
            map[stadium.id] = stadium;
            return map;
        });

        const teamsResponse = await CricBuzzUtils.getAllTeams();
        let allTeams = teamsResponse.data.map(team => ({
            id: team.id,
            name: team.name
        }));
        state.teamMap = allTeams.reduce((map, team) => {
            map[team.id] = team.name;
            return map;
        });

        const countryResponse = await CricBuzzUtils.getAllCountries();
        let allCountries = countryResponse.data.map(country => ({
            id: country.id,
            name: country.name
        }));
        state.countryMap = allCountries.reduce((map, country) => {
            map[country.id] = country.name;
            return map;
        });

        let allPlayers = (await CricBuzzUtils.getAllPlayers()).map(team => ({
            id: team.id,
            name: team.name
        }));
        state.playerMap = allPlayers.reduce((map, player) => {
            map[player.id] = player.name;
            return map;
        });

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
        console.log(state);
        this.setState(state);
        ContextUtils.hideLoader();
    }

    render() {
        return (
            <MatchCore
                {...this.state}
            />
        );
        // return (<div>
        //     Hello
        // </div>);
    }
}
