import store from "../../store";
import {
    clearFilter as clearMoviesFilter,
    clearFilters as clearMoviesFilters,
    resetTempFilters as resetMoviesTempFilters,
    toggleFilters as toggleMoviesFilters,
    updateFilters as updateMoviesFilters
} from "../../actions/moviesActions";

import {
    clearFilter as clearCardsFilter,
    clearFilters as clearCardsFilters,
    resetTempFilters as resetCardsTempFilters,
    toggleFilters as toggleCardsFilters,
    updateFilters as updateCardsFilters
} from "../../actions/cardsActions";

export default class Filters {
    static openFilters = (type) => {
        Filters.toggleFilters(type, true);
    };

    static closeFilters = (type) => {
        Filters.toggleFilters(type, false);
    };

    static toggleFilters = (type, value) => {
        let functions = {
            movies: toggleMoviesFilters,
            cards: toggleCardsFilters
        };

        store.dispatch(functions[type].call(null, value));
    };

    static resetTempFilters = (type) => {
        let functions = {
            movies: resetMoviesTempFilters,
            cards: resetCardsTempFilters
        };
        store.dispatch(functions[type].call(null));
    };

    static applyFilters = (type) => {
        let functions = {
            movies: updateMoviesFilters,
            cards: updateCardsFilters
        };
        let storeValues = store.getState();
        let currentValues = storeValues[type];
        let filtersTemp = currentValues.filtersTemp;
        store.dispatch(functions[type].call(null, filtersTemp));
    };

    static clearFilters = (type) => {
        let functions = {
            movies: clearMoviesFilters,
            cards: clearCardsFilters
        };
        store.dispatch(functions[type].call(null));
    };

    static clearFilter = (type, key) => {
        let functions = {
            movies: clearMoviesFilter,
            cards: clearCardsFilter
        };
        store.dispatch(functions[type].call(null, key));
    }
}
