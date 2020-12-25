import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            countries: [],
            state: '',
            city: ''
        };
        this.stadiumId = Utils.getUrlParam('id');
    }

    componentDidMount() {
        Context.showLoader();
        CricBuzzUtils.loadStadium(this.stadiumId);
        const countriesResponse = CricBuzzUtils.getAllCountries();
        countriesResponse.then(apiResponse => {
            const countries = apiResponse.data;
            this.setState({
                countries
            })
        }).catch(apiResponse => {
            console.log(apiResponse.data);
        });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if ((Object.keys(this.props.stadium).length > 0) && (Object.keys(prevProps.stadium).length === 0)) {
            this.setState(this.constructStateFromDetails());
        }
    }

    constructStateFromDetails = () => {
        let state = {};

        let stadium = this.props.stadium;
        state.name = stadium.name;
        state.city = stadium.city;
        state.state = stadium.state;
        state.countryId = stadium.country.id;
        state.countryName = stadium.country.name;

        return state;
    }

    handleSubmit = async event => {
        event.preventDefault();
        // Context.showLoader();
        // await response = CricBuzzUtils.updateSeries()
        let payload = {
            name: this.state.name,
            countryId: this.state.countryId
        }
        if (this.state.city) {
            payload.city = this.state.city;
        }

        if (this.state.state) {
            payload.state = this.state.state;
        }

        Context.showLoader();
        const updatePromise = CricBuzzUtils.updateStadium(this.stadiumId, payload);
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
    };

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleCityChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.city = event.target.value;
        this.setState(updatedState);
    };

    handleStateChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.state = event.target.value;
        this.setState(updatedState);
    };

    handleCountrySelect = (id, name) => {
        this.setState({
            countryId: id,
            countryName: name
        });
    }

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onCityChange={this.handleCityChange}
                    onStateChange={this.handleStateChange}
                    onCountrySelect={this.handleCountrySelect}
                    onSubmit={this.handleSubmit}
                />
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return ({
        stadium: store.cric.stadium
    });
}

export default connect(mapStateToProps)(Update);
