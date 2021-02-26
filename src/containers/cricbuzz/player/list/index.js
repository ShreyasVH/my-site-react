import React, { Component } from 'react';

import ContextUtils from '../../../../utils/context';
import CricBuzzUtils from "../../../../utils/cricbuzz";
import ListCore from "./core";
import {Helmet} from "react-helmet/es/Helmet";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            players: []
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        let players = await CricBuzzUtils.getAllPlayers();

        this.setState({
            players,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    handleEditClick = (id) => {
        this.props.history.push('/cricbuzz/players/update?id=' + id);
    };

    render() {
        return (
            <div>
                <Helmet title='Players' />
                <ListCore
                    {...this.state}
                    onEditClick={this.handleEditClick}
                />
            </div>
        );
    }
}
