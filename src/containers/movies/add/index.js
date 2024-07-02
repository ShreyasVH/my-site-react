import React, { Component } from 'react';

import UpdateCore from "./core";

import MovieUtils from "../../../utils/movies";
import Utils from '../../../utils';
import Context from "../../../utils/context";
import ApiHelper from "../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            qualities: [
                {
                    id: 'good',
                    name: 'Good'
                },
                {
                    id: 'normal',
                    name: 'Normal'
                }
            ],
            isLoaded: false
        },
        this.getDefaultState());
    }

    getDefaultState = () => ({
        name: '',
        languageId: '',
        languageName: '',
        seenInTheatre: false,
        actors: [],
        directors: [],
        releaseDate: '',
        imageUrl: '',
        imageFile: '',
        imageName: '',
        directorSuggestions: [],
        actorSuggestions: [],
        artistDialogOpen: false,
        newArtistText: ''
    });

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const allLanguagesResponse = await MovieUtils.getAllLanguages();
            state.languages = allLanguagesResponse.data;

            state.allArtists = await MovieUtils.getAllArtists();
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
            Context.showLoader();
            let imageUrl = process.env.REACT_APP_MOVIE_DEFAULT_IMAGE;
            if (this.state.imageFile) {
                const formattedName = this.state.name.toLowerCase().replace(/[/: -]/g, '_') + '_' + (new Date(this.state.releaseDate)).getFullYear() + '_' + this.state.languageName.toLowerCase();
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'movies', formattedName);
                let response = uploadResponse.data;
                if (uploadResponse.status === 200) {
                    imageUrl = response.secure_url;
                }
            }

            let payload = {
                name: this.state.name,
                languageId: this.state.languageId,
                seenInTheatre: this.state.seenInTheatre,
                releaseDate: Utils.formatDateToString(this.state.releaseDate),
                actors: this.state.actors.map(actor => actor.id),
                directors: this.state.directors.map(director => director.id),
                imageUrl
            }

            const addPromise = MovieUtils.addMovie(payload);
            addPromise.then(async apiResponse => {
                Context.hideLoader();
                Context.showNotify('Added Successfully', 'success');

                this.setState(this.getDefaultState());
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

    handleLanguageSelect = (id, name) => {
        this.setState({
            languageId: id,
            languageName: name
        });
    };

    handleReleaseDateChange = (event) => {
        const releaseDate = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.releaseDate = releaseDate;
        this.setState(updatedState);
    }

    handleViewedChange = (event, checked) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.seenInTheatre = checked;
        this.setState(updatedState);
    };

    handleDirectorSearch = event => {
        let keyword = event.target.value;
        let directorSuggestions = [];
        if (keyword.length > 2) {
            const existingDirectors = this.state.directors.map(director => director.name);
            directorSuggestions = this.state.allArtists.filter(artist => (!existingDirectors.includes(artist.name) && artist.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            directorSuggestions
        })
    };

    handleDirectorSelect = (id, name) => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.directors.push({
            id,
            name
        });

        updatedState.directorSuggestions = [];

        this.setState(updatedState);
    };

    handleDirectorRemove = id => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.directors.splice(updatedState.directors.map(director => director.id).indexOf(id), 1);

        this.setState(updatedState);
    };

    handleActorSearch = event => {
        let keyword = event.target.value;
        let actorSuggestions = [];
        if (keyword.length > 2) {
            const existingActors = this.state.actors.map(actor => actor.name);
            actorSuggestions = this.state.allArtists.filter(artist => (!existingActors.includes(artist.name) && artist.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            actorSuggestions
        })
    };

    handleActorSelect = (id, name) => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.actors.push({
            id,
            name
        });

        updatedState.actorSuggestions = [];

        this.setState(updatedState);
    };

    handleActorRemove = id => {
        let updatedState = Utils.copyObject(this.state);

        updatedState.actors.splice(updatedState.actors.map(actor => actor.id).indexOf(id), 1);

        this.setState(updatedState);
    };

    handleInitiateAddActor = value => {
        this.setState({
            artistDialogOpen: true,
            newArtistText: Utils.ucwords(value),
            artistType: 'actor'
        });
    };

    handleInitiateAddDirector = value => {
        this.setState({
            artistDialogOpen: true,
            newArtistText: Utils.ucwords(value),
            artistType: 'director'
        });
    };

    handleArtistDialogClose = () => {
        this.setState({
            artistDialogOpen: false
        });
    }

    handleArtistAdd = (id, name) => {
        if (this.state.artistType === 'actor') {
            this.handleActorSelect(id, name);
        } else {
            this.handleDirectorSelect(id, name);
        }

        let updatedState = Utils.copyObject(this.state);
        updatedState.allArtists.push({
            id,
            name
        });
        this.setState(updatedState);

        this.handleArtistDialogClose();
    }

    handleImageSelect = (file) => {
        this.setState({
            imageFile: file,
            imageName: file.name
        });
    };

    isFormValid = () => {
        let isValid = this.validateName().isValid;
        isValid = isValid && this.validateLanguage().isValid;
        isValid = isValid && this.validateReleaseDate().isValid;
        isValid = isValid && this.validateDirectors().isValid;
        isValid = isValid && this.validateActors().isValid;

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

    validateLanguage = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.languageId) {
            response.isValid = false;
            response.message = 'Language cannot be empty';
        }

        return response;
    };

    validateReleaseDate = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.releaseDate) {
            response.isValid = false;
            response.message = 'Release Date cannot be empty';
        }

        return response;
    };

    validateDirectors = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (this.state.directors.length === 0) {
            response.isValid = false;
            response.message = 'Directors cannot be empty';
        }

        return response;
    };

    validateActors = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (this.state.actors.length === 0) {
            response.isValid = false;
            response.message = 'Actors cannot be empty';
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
                    onLanguageSelect={this.handleLanguageSelect}
                    onReleaseDateChange={this.handleReleaseDateChange}
                    onViewedChange={this.handleViewedChange}
                    onDirectorSearch={this.handleDirectorSearch}
                    onDirectorSelect={this.handleDirectorSelect}
                    onDirectorRemove={this.handleDirectorRemove}
                    onInitiateAddDirector={this.handleInitiateAddDirector}
                    onActorSearch={this.handleActorSearch}
                    onActorSelect={this.handleActorSelect}
                    onActorRemove={this.handleActorRemove}
                    onInitiateAddActor={this.handleInitiateAddActor}
                    onSubmit={this.handleSubmit}
                    isFormValid={this.isFormValid()}
                    validateName={this.validateName()}
                    validateLanguage={this.validateLanguage()}
                    validateReleaseDate={this.validateReleaseDate()}
                    validateDirectors={this.validateDirectors()}
                    validateActors={this.validateActors()}
                    onArtistDialogClose={this.handleArtistDialogClose}
                    onArtistAdded={this.handleArtistAdd}
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
