import React, { Component } from 'react';
import DetailsCore from './core';
import { Helmet } from 'react-helmet';
import CricBuzzUtils from "../../../../utils/cricbuzz";
import Context from "../../../../utils/context";
import Utils from "../../../../utils";

export default class Details extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    async componentDidMount() {
        try {
            Context.showLoader();
            const playerId = Utils.getUrlParam('id');
            const playerResponse = await CricBuzzUtils.getPlayerByApi(playerId);
            let player = playerResponse.data;
            this.setState({
                isLoaded: true,
                player
            });
            Context.hideLoader();
        } catch (e) {
            Context.showNotify('Failed to get player details', 'error');
            console.log(e);
        }
    }

    getPageTitle = () => {
        let title = 'Player Details';

        if (this.state.isLoaded && this.state.player && this.state.player.name) {
            title = this.state.player.name;
        }

        return title + ' - Howzaat';
    }

    render () {
        return (
            <div>
                <Helmet
                    title={this.getPageTitle()}
                />

                <DetailsCore
                    {...this.state}
                />
            </div>
        );
    }
}