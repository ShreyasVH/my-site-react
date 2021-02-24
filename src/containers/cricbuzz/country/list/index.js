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
            countries: []
        };
    }

    async componentDidMount() {
        ContextUtils.showLoader();
        let countries = [];
        try {
            const countryResponse = await CricBuzzUtils.getAllCountries();
            countries = countryResponse.data;
        } catch (e) {
            console.log(e);
        }

        this.setState({
            countries,
            isLoaded: true
        });
        ContextUtils.hideLoader();
    }

    handleEditClick = (id) => {
        this.props.history.push('/cricbuzz/countries/update?id=' + id);
    };

    render() {
        return (
            <div>
                <Helmet title='Countries' />
                <ListCore
                    {...this.state}
                    onEditClick={this.handleEditClick}
                />
            </div>
        );
    }
}
