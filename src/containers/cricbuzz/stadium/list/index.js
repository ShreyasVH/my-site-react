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
            stadiums: []
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        let stadiums = [];
        try {
            const stadiumResponse = await CricBuzzUtils.getAllStadiums();
            stadiums = stadiumResponse.data;
        } catch (e) {
            console.log(e);
        }

        this.setState({
            stadiums,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    handleEditClick = (id) => {
        this.props.history.push('/cricbuzz/stadiums/update?id=' + id);
    };

    render() {
        return (
            <div>
                <Helmet title='Stadiums' />
                <ListCore
                    {...this.state}
                    onEditClick={this.handleEditClick}
                />
            </div>
        );
    }
}
