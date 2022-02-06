import React, { Component } from 'react';

import UpdateCore from "./core";

import MovieUtils from "../../../../utils/movies";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import ApiHelper from "../../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genders: [
                {
                    id: 'M',
                    name: 'Male'
                },
                {
                    id: 'F',
                    name: 'Female'
                }
            ],
            genderId: '',
            genderName: '',
            imageUrl: '',
            imageFile: '',
            imageName: '',
            isLoaded: false
        };
        this.artistId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const artistResponse = await MovieUtils.getArtist(this.artistId);

            let artist = artistResponse.data;
            state = {
                name: artist.name,
                genderId: artist.gender,
                genderName: this.state.genders.filter(gender => gender.id === artist.gender)[0].name,
                imageUrl: artist.image
            };

            let artistImageParts = artist.imageUrl.split('/');
            state.imageName = artistImageParts[artistImageParts.length - 1];
        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;

        this.setState(state);

        Context.hideLoader();
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name,
                gender: this.state.genderId
            }

            Context.showLoader();

            if (this.state.imageFile) {
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'artists', this.artistId);
                let response = uploadResponse.data;
                payload.imageUrl = response.secure_url;
            }

            const updatePromise = MovieUtils.updateArtist(this.artistId, payload);
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
        }
    };

    handleNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.name = event.target.value;
        this.setState(updatedState);
    };

    handleGenderSelect = (id, name) => {
        this.setState({
            genderId: id,
            genderName: name
        });
    }

    handleImageSelect = (file) => {
        this.setState({
            imageFile: file,
            imageName: file.name
        });
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = isValid && this.validateGender().isValid;

        return isValid;
    };

    validateName = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.name) {
            response.isValid = false;
            response.message = 'Name cannot be empty';
        }

        return response;
    };

    validateGender = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.genderId) {
            response.isValid = false;
            response.message = 'Gender cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onImageSelect={this.handleImageSelect}
                    onGenderSelect={this.handleGenderSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateGender={this.validateGender()}
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
