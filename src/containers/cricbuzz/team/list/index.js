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
            teams: []
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        let teams = [];
        try {
            const teamResponse = await CricBuzzUtils.getAllTeams();
            teams = teamResponse.data;
        } catch (e) {
            console.log(e);
        }

        this.setState({
            teams,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    handleEditClick = (id) => {
        this.props.history.push('/cricbuzz/teams/update?id=' + id);
    };

    render() {
        return (
            <div>
                <Helmet title='Teams' />
                <ListCore
                    {...this.state}
                    onEditClick={this.handleEditClick}
                />
            </div>
        );
    }
}
