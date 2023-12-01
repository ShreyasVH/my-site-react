import React, { Component } from 'react';

import UpdateCore from "./core";

import MovieUtils from "../../../../utils/movies";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import ApiHelper from "../../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    getDefaultState = () => ({
        name: this.props.name,
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
        embedded: !!this.props.embedded
    })

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name,
                gender: this.state.genderId,
                imageUrl: ((this.state.genderId === 'M') ? process.env.REACT_APP_ARTIST_DEFAULT_MALE : process.env.REACT_APP_ARTIST_DEFAULT_FEMALE)
            }

            Context.showLoader();

            const addPromise = MovieUtils.addArtist(payload);
            addPromise.then(async apiResponse => {
                const artistId = apiResponse.data.id;
                let isSuccess = true;
                if (this.state.imageFile) {
                    const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'artists', artistId);
                    let response = uploadResponse.data;
                    const updatePayload = {
                        imageUrl: response.secure_url
                    };

                    const updateResponse = await MovieUtils.updateArtist(artistId, updatePayload);
                    isSuccess = updateResponse.status === 200;

                    if (!isSuccess) {
                        Context.showNotify('Error while updating image', 'error');
                    }
                }

                Context.hideLoader();

                if (this.props.embedded) {
                    if (isSuccess) {
                        this.props.onArtistAdded && this.props.onArtistAdded(artistId, apiResponse.data.name);
                    }
                } else {
                    if (isSuccess) {
                        Context.showNotify('Added Successfully', 'success');
                    }

                    this.setState(this.getDefaultState());
                }
            }).catch(apiResponse => {
                Context.hideLoader();
                if (apiResponse.response) {
                    console.log(apiResponse.response.status);
                    console.log(apiResponse.response.data);
                }
                Context.showNotify('Failed to add. Please try again', 'error');
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

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}
