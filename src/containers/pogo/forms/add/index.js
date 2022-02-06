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
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            state = {
                name: '',
                pokemonNumber: null,
                pokemonName: '',
                imageUrl: '',
                releaseDate: null
            };

            const allPokemonsResponse = await PogoUtils.getAllPokemons();
            state.allPokemons = allPokemonsResponse.data.map(mon => ({
                id: mon.number,
                name: mon.name
            }));
        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;

        this.setState(state);

        Context.hideLoader();
    }

    reset = () => {
        this.setState({
            name: '',
            pokemonNumber: null,
            pokemonName: '',
            imageUrl: '',
            releaseDate: null
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name,
                number: this.state.pokemonNumber,
                releaseDate: this.state.releaseDate
            }

            Context.showLoader();

            if (this.state.imageFile) {
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'pogo', this.state.pokemonNumber + '_' + this.state.name.toLowerCase().replace(/\s/g, '_'));
                let response = uploadResponse.data;
                payload.imageUrl = response.secure_url;
            }

            const updatePromise = PogoUtils.createForm(payload);
            updatePromise.then(apiResponse => {
                Context.hideLoader();
                Context.showNotify('Updated Successfully', 'success');

                this.reset();
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

    handlePokemonSearch = event => {
        let keyword = event.target.value;
        let updatedState = Utils.copyObject(this.state);
        let pokemonSuggestions = [];
        if (keyword.length === 0) {
            updatedState.pokemonId = null;
            updatedState.pokemonName = '';
        } else if (keyword.length > 2) {
            pokemonSuggestions = this.state.allPokemons.filter(mon => (mon.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        updatedState.pokemonSuggestions = pokemonSuggestions;
        this.setState(updatedState);
    };

    handlePokemonSelect = async (id, name) => {
        this.setState({
            pokemonNumber: id,
            pokemonName: name,
            pokemonSuggestions: []
        });
    }

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = isValid && this.validatePokemon().isValid;

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

    validatePokemon = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.pokemonNumber) {
            response.isValid = false;
            response.message = 'Pokemon cannot be empty';
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
                    onPokemonSearch={this.handlePokemonSearch}
                    onPokemonSelect={this.handlePokemonSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validatePokemon={this.validatePokemon()}
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
