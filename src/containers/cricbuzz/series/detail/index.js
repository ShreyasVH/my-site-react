import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeriesCore from './core';

import CricUtils from '../../../../utils/cricbuzz';
import ContextUtils from '../../../../utils/context';
import Utils from '../../../../utils';

export default class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount = async () => {
        ContextUtils.showLoader();
        const seriesResponse = await CricUtils.getSeriesByApi(Utils.getUrlParam('id'));
        let state = seriesResponse.data;

        const stadiumsResponse = await CricUtils.getAllStadiums();
        const allStadiums = stadiumsResponse.data;
        let stadiumMap = {};
        allStadiums.forEach(stadium => {
            stadiumMap[stadium.id] = stadium;
        });
        state.stadiumMap = stadiumMap;

        const teamsResponse = await CricUtils.getAllTeams();
        const allTeams = teamsResponse.data.map(team => ({
            id: team.id,
            name: team.name
        }));
        let teamMap = {};
        allTeams.forEach(team => {
            teamMap[team.id] = team.name;
        });
        state.teamMap = teamMap;

        const countriesResponse = await CricUtils.getAllCountries();
        const allCountries = countriesResponse.data;
        let countryMap = {};
        allCountries.forEach(country => {
            countryMap[country.id] = country.name;
        });
        state.countryMap = countryMap;
        state.isLoaded = true;

        this.setState(state);
        ContextUtils.hideLoader();
    };

    handleMatchClick = id => {
        ContextUtils.showLoader();
        CricUtils.setMatch(CricUtils.getMatch(id));
        window.scrollTo(0, 0);
        this.props.history.push('/cricbuzz/matches/detail?id=' + id);
    };

    handleUpdateMatchClick = (event, matchId) => {
        event.stopPropagation();
        this.props.history.push('/cricbuzz/matches/update?id=' + matchId);
    }

    render() {
        return (
            <SeriesCore
                {...this.state}
                onClickMatch={this.handleMatchClick}
                onUpdateMatchClick={this.handleUpdateMatchClick}
            />
        );
    }
}