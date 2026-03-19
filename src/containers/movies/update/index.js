import React, { useCallback, useEffect, useState } from 'react';

import UpdateCore from "./core";

import MovieUtils from "../../../utils/movies";
import Utils from '../../../utils';
import Context from "../../../utils/context";
import ApiHelper from "../../../utils/apiHelper";
import { useNavigate } from "react-router-dom";

export default function Update(props) {
    const navigate = useNavigate();
    const movieId = Utils.getUrlParam('id');

    const [state, setState] = useState({
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
        newArtistText: '',
        artistType: '',
        languageId: '',
        languageName: '',
        releaseDate: '',
        seenInTheatre: false,
        directors: [],
        actors: [],
        obtained: false,
        size: '',
        formatId: '',
        formatName: '',
        subtitles: false,
        qualityId: '',
        qualityName: '',
        basename: '',
        languages: [],
        formats: [],
        allArtists: []
    });

    useEffect(() => {
        const loadData = async () => {
            Context.showLoader();
            let updatedState = {};

            try {
                const movieResponse = await MovieUtils.getMovieDetails(movieId);

                const movie = movieResponse.data;
                updatedState = {
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
                    updatedState.size = movie.size.toString();
                    updatedState.formatId = movie.format.id;
                    updatedState.formatName = movie.format.name;
                    updatedState.subtitles = movie.subtitles;
                    updatedState.qualityId = movie.quality;
                    updatedState.qualityName = state.qualities.filter(
                        quality => quality.id === movie.quality
                    )[0]?.name || '';
                    updatedState.basename = movie.basename;
                }

                if (movie.imageUrl) {
                    const imageParts = movie.imageUrl.split('/');
                    updatedState.imageName = imageParts[imageParts.length - 1];
                }

                const allLanguagesResponse = await MovieUtils.getAllLanguages();
                updatedState.languages = allLanguagesResponse.data;

                const allFormatsResponse = await MovieUtils.getAllFormats();
                updatedState.formats = allFormatsResponse.data;

                updatedState.allArtists = await MovieUtils.getAllArtists();
            } catch (error) {
                console.log(error);
                Context.showNotify('Error while loading data.', 'error');
            }

            updatedState.isLoaded = true;

            setState(prev => ({
                ...prev,
                ...updatedState
            }));

            Context.hideLoader();
        };

        loadData();
    }, [movieId, state.qualities]);

    const handleNameChange = (event) => {
        setState(prev => ({
            ...prev,
            name: event.target.value
        }));
    };

    const handleSizeChange = (event) => {
        setState(prev => ({
            ...prev,
            size: event.target.value
        }));
    };

    const handleLanguageSelect = (id, name) => {
        setState(prev => ({
            ...prev,
            languageId: id,
            languageName: name
        }));
    };

    const handleFormatSelect = (id, name) => {
        setState(prev => ({
            ...prev,
            formatId: id,
            formatName: name
        }));
    };

    const handleReleaseDateChange = (event) => {
        const releaseDate = (new Date(event.target.value)).getTime();

        setState(prev => ({
            ...prev,
            releaseDate
        }));
    };

    const handleSubtitleChange = (event, checked) => {
        setState(prev => ({
            ...prev,
            subtitles: checked
        }));
    };

    const handleViewedChange = (event, checked) => {
        setState(prev => ({
            ...prev,
            seenInTheatre: checked
        }));
    };

    const handleObtainedChange = (event, checked) => {
        setState(prev => {
            const updatedState = {
                ...prev,
                obtained: checked
            };

            if (!checked) {
                updatedState.size = null;
                updatedState.qualityId = null;
                updatedState.quality = '';
                updatedState.basename = null;
                updatedState.formatId = null;
                updatedState.formatName = '';
                updatedState.subtitles = null;
            }

            return updatedState;
        });
    };

    const handleQualitySelect = (id, name) => {
        setState(prev => ({
            ...prev,
            qualityId: id,
            qualityName: name
        }));
    };

    const handleBaseNameChange = (event) => {
        setState(prev => ({
            ...prev,
            basename: event.target.value
        }));
    };

    const handleDirectorSearch = (event) => {
        const keyword = event.target.value;
        let directorSuggestions = [];

        if (keyword.length > 2) {
            const existingDirectors = state.directors.map(director => director.name);
            directorSuggestions = state.allArtists.filter(
                artist =>
                    !existingDirectors.includes(artist.name) &&
                    artist.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            );
        }

        setState(prev => ({
            ...prev,
            directorSuggestions
        }));
    };

    const handleDirectorSelect = (id, name) => {
        setState(prev => ({
            ...prev,
            directors: [
                ...prev.directors,
                { id, name }
            ],
            directorSuggestions: []
        }));
    };

    const handleDirectorRemove = (id) => {
        setState(prev => ({
            ...prev,
            directors: prev.directors.filter(director => director.id !== id)
        }));
    };

    const handleActorSearch = (event) => {
        const keyword = event.target.value;
        let actorSuggestions = [];

        if (keyword.length > 2) {
            const existingActors = state.actors.map(actor => actor.name);
            actorSuggestions = state.allArtists.filter(
                artist =>
                    !existingActors.includes(artist.name) &&
                    artist.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            );
        }

        setState(prev => ({
            ...prev,
            actorSuggestions
        }));
    };

    const handleActorSelect = (id, name) => {
        setState(prev => ({
            ...prev,
            actors: [
                ...prev.actors,
                { id, name }
            ],
            actorSuggestions: []
        }));
    };

    const handleActorRemove = (id) => {
        setState(prev => ({
            ...prev,
            actors: prev.actors.filter(actor => actor.id !== id)
        }));
    };

    const handleInitiateAddActor = (value) => {
        setState(prev => ({
            ...prev,
            artistDialogOpen: true,
            newArtistText: Utils.ucwords(value),
            artistType: 'actor'
        }));
    };

    const handleInitiateAddDirector = (value) => {
        setState(prev => ({
            ...prev,
            artistDialogOpen: true,
            newArtistText: Utils.ucwords(value),
            artistType: 'director'
        }));
    };

    const handleArtistDialogClose = () => {
        setState(prev => ({
            ...prev,
            artistDialogOpen: false
        }));
    };

    const handleArtistAdd = (id, name) => {
        setState(prev => {
            const updatedArtists = [...prev.allArtists, { id, name }];

            if (prev.artistType === 'actor') {
                return {
                    ...prev,
                    actors: [...prev.actors, { id, name }],
                    actorSuggestions: [],
                    allArtists: updatedArtists,
                    artistDialogOpen: false
                };
            }

            return {
                ...prev,
                directors: [...prev.directors, { id, name }],
                directorSuggestions: [],
                allArtists: updatedArtists,
                artistDialogOpen: false
            };
        });
    };

    const handleImageSelect = (file) => {
        setState(prev => ({
            ...prev,
            imageFile: file,
            imageName: file.name
        }));
    };

    const validateName = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (!state.name) {
            response.isValid = false;
            response.message = 'Name cannot be empty';
        }

        return response;
    };

    const validateSize = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (!state.size) {
            response.isValid = false;
            response.message = 'Size cannot be empty';
        } else if (isNaN(state.size.replace(/,/g, ''))) {
            response.isValid = false;
            response.message = 'Invalid size';
        }

        return response;
    };

    const validateLanguage = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (!state.languageId) {
            response.isValid = false;
            response.message = 'Language cannot be empty';
        }

        return response;
    };

    const validateFormat = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (!state.formatId) {
            response.isValid = false;
            response.message = 'Format cannot be empty';
        }

        return response;
    };

    const validateReleaseDate = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (!state.releaseDate) {
            response.isValid = false;
            response.message = 'Release Date cannot be empty';
        }

        return response;
    };

    const validateDirectors = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (state.directors.length === 0) {
            response.isValid = false;
            response.message = 'Directors cannot be empty';
        }

        return response;
    };

    const validateActors = () => {
        const response = {
            isValid: true,
            message: ''
        };

        if (state.actors.length === 0) {
            response.isValid = false;
            response.message = 'Actors cannot be empty';
        }

        return response;
    };

    const isFormValid = () => {
        let isValid = validateName().isValid;

        isValid = isValid && validateLanguage().isValid;
        isValid = isValid && validateReleaseDate().isValid;
        isValid = isValid && validateDirectors().isValid;
        isValid = isValid && validateActors().isValid;

        if (state.obtained) {
            isValid = isValid && validateSize().isValid;
            isValid = isValid && validateFormat().isValid;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormValid()) {
            Context.showLoader();

            try {
                const payload = {
                    name: state.name,
                    languageId: state.languageId,
                    formatId: state.formatId,
                    subtitles: state.subtitles,
                    seenInTheatre: state.seenInTheatre,
                    quality: state.qualityId,
                    releaseDate: Utils.formatDateToString(state.releaseDate),
                    basename: state.basename,
                    actors: state.actors.map(actor => actor.id),
                    directors: state.directors.map(director => director.id),
                    obtained: state.obtained
                };

                let size = null;
                if (state.obtained) {
                    size = state.size.replace(/,/g, '');
                }
                payload.size = size;

                if (state.imageFile) {
                    const formattedName =
                        state.name.toLowerCase().replace(/[/: -]/g, '_') +
                        '_' +
                        (new Date(state.releaseDate)).getFullYear() +
                        '_' +
                        state.languageName.toLowerCase();

                    const uploadResponse = await ApiHelper.uploadFile(
                        state.imageFile,
                        'movies',
                        formattedName
                    );

                    const response = uploadResponse.data;
                    payload.imageUrl = response.secure_url;
                }

                await MovieUtils.updateMovie(movieId, payload);

                Context.hideLoader();
                Context.showNotify('Updated Successfully', 'success');
                navigate(`/movies/movieDetail?id=${movieId}`);
            } catch (apiResponse) {
                Context.hideLoader();
                if (apiResponse.response) {
                    console.log(apiResponse.response.status);
                    console.log(apiResponse.response.data);
                }
                Context.showNotify('Failed to update. Please try again', 'error');
            }
        }
    };

    const renderPage = () => {
        if (state.isLoaded) {
            return (
                <UpdateCore
                    {...state}
                    onNameChange={handleNameChange}
                    onSizeChange={handleSizeChange}
                    onImageSelect={handleImageSelect}
                    onLanguageSelect={handleLanguageSelect}
                    onFormatSelect={handleFormatSelect}
                    onReleaseDateChange={handleReleaseDateChange}
                    onSubtitleChange={handleSubtitleChange}
                    onViewedChange={handleViewedChange}
                    onObtainedChange={handleObtainedChange}
                    onQualitySelect={handleQualitySelect}
                    onBaseNameChange={handleBaseNameChange}
                    onDirectorSearch={handleDirectorSearch}
                    onDirectorSelect={handleDirectorSelect}
                    onDirectorRemove={handleDirectorRemove}
                    onInitiateAddDirector={handleInitiateAddDirector}
                    onActorSearch={handleActorSearch}
                    onActorSelect={handleActorSelect}
                    onActorRemove={handleActorRemove}
                    onInitiateAddActor={handleInitiateAddActor}
                    onSubmit={handleSubmit}
                    isFormValid={isFormValid()}
                    validateName={validateName()}
                    validateSize={validateSize()}
                    validateLanguage={validateLanguage()}
                    validateFormat={validateFormat()}
                    validateReleaseDate={validateReleaseDate()}
                    validateDirectors={validateDirectors()}
                    validateActors={validateActors()}
                    onArtistDialogClose={handleArtistDialogClose}
                    onArtistAdded={handleArtistAdd}
                />
            );
        }

        return null;
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
}