import React, { Component } from 'react';

import UpdateCore from './core';

import PogoUtils from '../../../../utils/pogo';
import Utils from '../../../../utils';
import Context from '../../../../utils/context';

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        this.monNumber = Utils.getUrlParam('num');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const monResponse = await PogoUtils.getMonByNumber(this.monNumber);

            let mon = monResponse.data;
            state = {
                name: mon.name,
                regionId: mon.region.id,
                regionName: mon.region.name,
                candyPokemonName: mon.candyPokemon.name,
                candyPokemonNumber: mon.candyPokemon.number,
                candiesToEvolve: mon.candiesToEvolve
            };

            const regionsResponse = await PogoUtils.getAllRegions();
            state.regions = regionsResponse.data;

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

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name,
                regionId: this.state.regionId,
                candyPokemonNumber: this.state.candyPokemonNumber,
                candiesToEvolve: this.state.candiesToEvolve
            }

            Context.showLoader();

            const updatePromise = PogoUtils.update(payload, this.monNumber);
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

    handleCandyCountChange = event => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.candiesToEvolve = event.target.value;
        this.setState(updatedState);
    };

    handleCandyPokemonSearch = event => {
        let keyword = event.target.value;
        let updatedState = Utils.copyObject(this.state);
        let candyPokemonSuggestions = [];
        if (keyword.length === 0) {
            updatedState.candyPokemonId = null;
            updatedState.candyPokemonName = '';
        } else if (keyword.length > 2) {
            candyPokemonSuggestions = this.state.allPokemons.filter(mon => (mon.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        updatedState.candyPokemonSuggestions = candyPokemonSuggestions;
        this.setState(updatedState);
    };

    handleRegionSelect = (id, name) => {
        this.setState({
            regionId: id,
            regionName: name
        });
    }

    handleCandyPokemonSelect = (id, name) => {
        this.setState({
            candyPokemonNumber: id,
            candyPokemonName: name,
            candyPokemonSuggestions: []
        });
    }

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = (isValid && this.validateRegion().isValid);

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

    validateRegion = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.regionId) {
            response.isValid = false;
            response.message = 'Region cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onRegionSelect={this.handleRegionSelect}
                    onCandyCountChange={this.handleCandyCountChange}
                    onCandyPokemonSearch={this.handleCandyPokemonSearch}
                    onCandyPokemonSelect={this.handleCandyPokemonSelect}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateRegion={this.validateRegion()}
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
