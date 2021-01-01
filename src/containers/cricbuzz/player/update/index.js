import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import ApiHelper from "../../../../utils/apiHelper";

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            countries: [],
            dateOfBirth: '',
            imageUrl: '',
            imageFile: '',
            imageName: ''
        };
        this.playerId = Utils.getUrlParam('id');
    }

    componentDidMount() {
        Context.showLoader();
        CricBuzzUtils.loadPlayer(this.playerId);
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
        if ((Object.keys(this.props.player).length > 0) && (Object.keys(prevProps.player).length === 0)) {
            this.setState(this.constructStateFromDetails());
        }
    }

    constructStateFromDetails = () => {
        let state = {};

        let player = this.props.player;
        state.name = player.name;
        state.dateOfBirth = player.dateOfBirth;
        state.countryId = player.country.id;
        state.countryName = player.country.name;
        state.imageUrl = player.image;
        let playerImageParts = player.image.split('/');
        state.imageName = playerImageParts[playerImageParts.length - 1];


        return state;
    }

    handleSubmit = async event => {
        event.preventDefault();
        let payload = {
            name: this.state.name,
            countryId: this.state.countryId,
            dateOfBirth: this.state.dateOfBirth
        }

        Context.showLoader();

        if (this.state.imageFile) {
            const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'cric', 'player_' + this.playerId);
            let response = uploadResponse.data;
            payload.image = response.secure_url;
            console.log(response);
        }

        console.log(payload);


        const updatePromise = CricBuzzUtils.updatePlayer(this.playerId, payload);
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

    handleDateOfBirthChange = event => {
        const dateOfBirth = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.dateOfBirth = dateOfBirth;
        this.setState(updatedState);
    };

    handleCountrySelect = (id, name) => {
        this.setState({
            countryId: id,
            countryName: name
        });
    }

    handleImageSelect = (file) => {
        this.setState({
            imageFile: file,
            imageName: file.name
        });
    };

    isFormValid = () => {
        return this.state.name;
    };

    renderPage = () => {
        if (Object.keys(this.state).length > 0) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onDateOfBirthChange={this.handleDateOfBirthChange}
                    onCountrySelect={this.handleCountrySelect}
                    onImageSelect={this.handleImageSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    isMobile={this.props.isMobile}
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
        player: store.cric.player,
        isMobile: store.context.isMobile
    });
}

export default connect(mapStateToProps)(Update);
