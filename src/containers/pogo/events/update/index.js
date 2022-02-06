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

            const eventResponse = await PogoUtils.getEventId(this.id);

            let event = eventResponse.data;
            state = {
                name: event.name,
                startTime: event.startTime,
                endTime: event.endTime,
                forms: event.forms.map(form => ({
                    id: form.id,
                    name: form.name,
                    number: form.pokemonNumber
                }))
            };

            const allPokemonsResponse = await PogoUtils.getAllPokemons();
            state.allPokemons = allPokemonsResponse.data.map(mon => ({
                id: mon.number,
                name: mon.name
            }));

            state.pokemonMap = allPokemonsResponse.data.reduce((object, value) => {
                object[value.number] = value;
                return object;
            }, {});

        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;

        this.setState(state);

        Context.hideLoader();
    }

    handlePokemonSearch = event => {
        let keyword = event.target.value;
        let updatedState = Utils.copyObject(this.state);
        let pokemonSuggestions = [];
        if (keyword.length === 0) {
            updatedState.PokemonId = null;
            updatedState.PokemonName = '';
        } else if (keyword.length > 2) {
            pokemonSuggestions = this.state.allPokemons.filter(mon => (mon.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        updatedState.pokemonSuggestions = pokemonSuggestions;
        this.setState(updatedState);
    };

    handlePokemonSelect = async (id, name) => {
        const filterResponse = await PogoUtils.getFormsWithFilter({
            count: 200,
            filters: {
                number: [
                    id
                ]
            }
        });

        this.setState({
            pokemonNumber: id,
            pokemonName: name,
            pokemonSuggestions: [],
            formSuggestions: filterResponse.data.list.filter(form => !this.state.forms.map(f => f.id).includes(form.formId)).map(form => ({
                id: form.formId,
                name: form.formName
            }))
        });
    }

    handleFormSelect = async (id, name) => {
        let updatedState = Utils.copyObject(this.state);

        this.setState({
            forms: this.state.forms.concat({
                id,
                name,
                number: updatedState.pokemonNumber
            })
        });
    };

    handlePokemonRemove = () => {
        this.setState({
            pokemonNumber: null,
            pokemonName: '',
            formSuggestions: []
        })
    };

    handleFormRemove = (formId) => {
        let updatedState = Utils.copyObject(this.state);
        let index = -1;

        for (let i in updatedState.forms) {
            let form = updatedState.forms[i];
            if (formId === form.id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            updatedState.forms.splice(index, 1);
        }

        this.setState(updatedState);
    };

    handleSubmit = async event => {
        event.preventDefault();
        if (this.isFormValid()) {
            let payload = {
                name: this.state.name,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                forms: this.state.forms.map(form => form.id)
            }

            Context.showLoader();


            const updatePromise = PogoUtils.updateEvent(this.id, payload);
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

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    }

    handleEndTimeChange = (event) => {
        const endTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.endTime = endTime;
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
        isValid = isValid && this.validateForms().isValid;
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

    validateForms = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (this.state.forms.length === 0) {
            response.isValid = false;
            response.message = 'Forms cannot be empty';
        }

        return response;
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onNameChange={this.handleNameChange}
                    onStartTimeChange={this.handleStartTimeChange}
                    onEndTimeChange={this.handleEndTimeChange}
                    onPokemonSearch={this.handlePokemonSearch}
                    onPokemonSelect={this.handlePokemonSelect}
                    onPokemonRemove={this.handlePokemonRemove}
                    onFormSelect={this.handleFormSelect}
                    onFormRemove={this.handleFormRemove}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateForms={this.validateForms()}
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
