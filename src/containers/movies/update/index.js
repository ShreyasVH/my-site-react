import React, { Component } from 'react';

import UpdateCore from "./core";

import MovieUtils from "../../../utils/movies";
import Utils from '../../../utils';
import Context from "../../../utils/context";
import ApiHelper from "../../../utils/apiHelper";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            imageFile: '',
            imageName: '',
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
            directorSuggestions: [],
            actorSuggestions: [],
            isLoaded: false,
            artistDialogOpen: false,
            newArtistText: ''
        };
        this.movieId = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {
            const movieResponse = await MovieUtils.getMovieDetails(this.movieId);

            let movie = movieResponse.data;
            state = {
                name: movie.name,
                languageId: movie.language.id,
                languageName: movie.language.name,
                releaseDate: movie.releaseDate,
                seenInTheatre: movie.seenInTheatre,
                imageUrl: movie.imageUrl,
                directors: movie.directors.map(director => ({
                    id: director.id,
                    name: director.name
                })),
                actors: movie.actors.map(actor => ({
                    id: actor.id,
                    name: actor.name
                })),
                obtained: movie.obtained
            };

            if (movie.obtained) {
                state.size = movie.size.toString();
                state.formatId = movie.format.id;
                state.formatName = movie.format.name;
                state.subtitles = movie.subtitles;
                state.qualityId = movie.quality;
                state.qualityName = this.state.qualities.filter(quality => quality.id === movie.quality)[0].name;
                state.basename = movie.basename;
            }

            if (movie.imageUrl) {
                let imageParts = movie.imageUrl.split('/');
                state.imageName = imageParts[imageParts.length - 1];
            }

            const allLanguagesResponse = await MovieUtils.getAllLanguages();
            state.languages = allLanguagesResponse.data;

            const allFormatsResponse = await MovieUtils.getAllFormats();
            state.formats = allFormatsResponse.data;

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

            let payload = {
                name: this.state.name,
                languageId: this.state.languageId,
                formatId: this.state.formatId,
                subtitles: this.state.subtitles,
                seenInTheatre: this.state.seenInTheatre,
                quality: this.state.qualityId,
                releaseDate: Utils.formatDateToString(this.state.releaseDate),
                basename: this.state.basename,
                actors: this.state.actors.map(actor => actor.id),
                directors: this.state.directors.map(director => director.id),
                obtained: this.state.obtained
            }
            let size = null;
            if (this.state.obtained) {
                size = this.state.size.replace(/,/g, '');
            }
            payload.size = size;

            if (this.state.imageFile) {
                const formattedName = this.state.name.toLowerCase().replace(/[/: -]/g, '_') + '_' + (new Date(this.state.releaseDate)).getFullYear() + '_' + this.state.languageName.toLowerCase();
                const uploadResponse = await ApiHelper.uploadFile(this.state.imageFile, 'movies', formattedName);
                let response = uploadResponse.data;
                payload.imageUrl = response.secure_url;
            }

            const updatePromise = MovieUtils.updateMovie(this.movieId, payload);
            updatePromise.then(apiResponse => {
                Context.hideLoader();
                Context.showNotify('Updated Successfully', 'success');
                this.props.history.push('/movies/movieDetail?id=' + this.movieId);
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

    handleSizeChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.size = event.target.value;
        this.setState(updatedState);
    };

    handleLanguageSelect = (id, name) => {
        this.setState({
            languageId: id,
            languageName: name
        });
    };

    handleFormatSelect = (id, name) => {
        this.setState({
            formatId: id,
            formatName: name
        });
    };

    handleReleaseDateChange = (event) => {
        const releaseDate = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.releaseDate = releaseDate;
        this.setState(updatedState);
    }

    handleSubtitleChange = (event, checked) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.subtitles = checked;
        this.setState(updatedState);
    };

    handleViewedChange = (event, checked) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.seenInTheatre = checked;
        this.setState(updatedState);
    };

    handleObtainedChange = (event, checked) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.obtained = checked;
        if (!checked) {
            updatedState.size = null;
            updatedState.qualityId = null;
            updatedState.quality = '';
            updatedState.basename = null;
            updatedState.formatId = null;
            updatedState.formatName = '';
            updatedState.subtitles = null;
        }
        this.setState(updatedState);
    };

    handleQualitySelect = (id, name) => {
        this.setState({
            qualityId: id,
            qualityName: name
        });
    };

    handleBaseNameChange = event => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.basename = event.target.value;
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

        if (this.state.obtained) {
            isValid = isValid && this.validateSize().isValid;
            isValid = isValid && this.validateFormat().isValid;
        }

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

    validateSize = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.size) {
            response.isValid = false;
            response.message = 'Size cannot be empty';
        } else if (isNaN(this.state.size.replace(/,/g, ''))) {
            response.isValid = false;
            response.message = 'Invalid size';
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

    validateFormat = () => {
        let response = {
            isValid: true,
            message: ''
        };

        if (!this.state.formatId) {
            response.isValid = false;
            response.message = 'Format cannot be empty';
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
                    onSizeChange={this.handleSizeChange}
                    onImageSelect={this.handleImageSelect}
                    onLanguageSelect={this.handleLanguageSelect}
                    onFormatSelect={this.handleFormatSelect}
                    onReleaseDateChange={this.handleReleaseDateChange}
                    onSubtitleChange={this.handleSubtitleChange}
                    onViewedChange={this.handleViewedChange}
                    onObtainedChange={this.handleObtainedChange}
                    onQualitySelect={this.handleQualitySelect}
                    onBaseNameChange={this.handleBaseNameChange}
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
                    validateSize={this.validateSize()}
                    validateLanguage={this.validateLanguage()}
                    validateFormat={this.validateFormat()}
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
