import React, { Component } from 'react';

import UpdateCore from "./core";

import PogoUtils from '../../../../utils/pogo';
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import ApiHelper from "../../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        this.id = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {

            const formResponse = await PogoUtils.getFormById(this.id);

            let form = formResponse.data;
            state = {
                name: form.name,
                pokemonNumber: form.pokemon.number,
                pokemonName: form.pokemon.name,
                imageUrl: form.imageUrl,
                releaseDate: form.releaseDate

            };

            // const regionsResponse = await PogoUtils.getAllRegions();
            // state.regions = regionsResponse.data;

            const allPokemonsResponse = await PogoUtils.getAllPokemons();
            state.allPokemons = allPokemonsResponse.data.map(mon => ({
                id: mon.number,
                name: mon.name
            }));

            if (form.imageUrl) {
                let imageParts = form.imageUrl.split('/');
                state.imageName = imageParts[imageParts.length - 1];
            }
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
                releaseDate: this.state.releaseDate
            }

            Context.showLoader();

            if (this.state.imageFile) {
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'pogo', this.state.pokemonNumber + '_' + this.state.name);
                let response = uploadResponse.data;
                payload.imageUrl = response.secure_url;
            }

            const updatePromise = PogoUtils.updateForm(payload, this.id);
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

    handleReleaseDateChange = (event) => {
        const releaseDate = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.releaseDate = releaseDate;
        this.setState(updatedState);
    }

    handleImageSelect = (file) => {
        this.setState({
            imageFile: file,
            imageName: file.name
        });
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;

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

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onReleaseDateChange={this.handleReleaseDateChange}
                    onImageSelect={this.handleImageSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
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
