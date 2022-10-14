import React, { Component } from 'react';
import StatsCore from './core';
import { Helmet } from 'react-helmet';
import CricBuzzUtils from "../../../../utils/cricbuzz";
import Context from "../../../../utils/context";
import Utils from "../../../../utils";

export default class Scores extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoaded: false,
            scores: []
        };
    }

    async componentDidMount() {
        try {
            Context.showLoader();

            const scoresResponse = await CricBuzzUtils.getScores({
                playerId: Utils.getUrlParam('id')
            });

            this.setState({
                scores: scoresResponse.data
            });

            Context.hideLoader();
        } catch (e) {
            Context.showNotify('Failed to get score details', 'error');
            console.log(e);
        }
    }

    render () {
        return (
            <div>
                <Helmet
                    title={'Scores - Howzzat'}
                />

                <StatsCore
                    {...this.state}
                />
            </div>
        );
    }
}