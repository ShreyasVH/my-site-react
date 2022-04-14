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

            let allTypesResponse = await PogoUtils.getAllTypes();
            const allTypes = allTypesResponse.data;

            let form = formResponse.data;

            let types = [];
            for (let index = 0; index < form.typeIds.length; index++) {
                types.push({
                    id: form.typeIds[index],
                    name: form.typeNames[index]
                });
            }

            state = {
                name: form.name,
                pokemonNumber: form.pokemonNumber,
                pokemonName: form.pokemonName,
                imageUrl: form.imageUrl,
                releaseDate: form.releaseDate,
                alolan: form.alolan,
                galarian: form.galarian,
                hisuian: form.hisuian,
                shiny: form.shiny,
                female: form.female,
                costumed: form.costumed,
                types,
                allTypes
            };

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
                releaseDate: this.state.releaseDate,
                isAlolan: this.state.alolan,
                isGalarian: this.state.galarian,
                isHisuian: this.state.hisuian,
                isShiny: this.state.shiny,
                isFemale: this.state.female,
                isCostumed: this.state.costumed,
                types: this.state.types.map(type => (type.id))
            }

            Context.showLoader();

            if (this.state.imageFile) {
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'pogo', this.state.pokemonNumber + '_' + this.state.name.toLowerCase().replace(/\s/g, '_'));
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

    handleAlolanChange = (event, checked) => {
        this.setState({
            alolan: checked
        })
    };

    handleGalarianChange = (event, checked) => {
        this.setState({
            galarian: checked
        })
    };

    handleHisuianChange = (event, checked) => {
        this.setState({
            hisuian: checked
        })
    };

    handleShinyChange = (event, checked) => {
        this.setState({
            shiny: checked
        })
    };

    handleFemaleChange = (event, checked) => {
        this.setState({
            female: checked
        })
    };

    handleCostumedChange = (event, checked) => {
        this.setState({
            costumed: checked
        })
    };

    handleTypeSelect = (id, name) => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.types.push({
            id,
            name
        });

        updatedState.directorSuggestions = [];

        this.setState(updatedState);
    };

    handleTypeRemove = id => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.types.splice(updatedState.types.map(type => type.id).indexOf(id), 1);

        this.setState(updatedState);
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = isValid && this.validateTypes().isValid;

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

    validateTypes = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (this.state.types.length === 0) {
            response.isValid = false;
            response.message = 'Types cannot be empty';
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
                    onAlolanChange={this.handleAlolanChange}
                    onGalarianChange={this.handleGalarianChange}
                    onHisuianChange={this.handleHisuianChange}
                    onShinyChange={this.handleShinyChange}
                    onFemaleChange={this.handleFemaleChange}
                    onCostumedChange={this.handleCostumedChange}
                    onTypeSelect={this.handleTypeSelect}
                    onTypeRemove={this.handleTypeRemove}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateTypes={this.validateTypes()}
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
