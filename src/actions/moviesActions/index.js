/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { MOVIE_EVENTS } from '../../constants/events';

export const updateDashBoard = (data = []) => ({
	type: MOVIE_EVENTS.UPDATE_DASHBOARD,
	payload: data
});

export const updateMovieList = (list, offset, count, shouldReplace = true) => ({
	type: MOVIE_EVENTS.UPDATE_MOVIE_LIST,
	payload: {
		list,
		offset,
		totalCount: count,
		shouldReplace
	}
});

export const clearMovieList = () => ({
	type: MOVIE_EVENTS.CLEAR_MOVIE_LIST,
	payload: {
		list: [],
		offset: 0,
		totalCount: -1
	}
});

export const updateFilters = (filters = []) => ({
	type: MOVIE_EVENTS.UPDATE_FILTERS,
	payload: filters
});

export const updateTempFilters = (filtersTemp = []) => ({
	type: MOVIE_EVENTS.UPDATE_TEMP_FILTERS,
	payload: filtersTemp
});

export const resetTempFilters = () => ({
	type: MOVIE_EVENTS.RESET_TEMP_FILTERS,
	payload: {}
});

export const setMovie = (movie) => ({
	type: MOVIE_EVENTS.SET_MOVIE,
	payload: {
		individual: movie
	}
});

export const toggleFilters = value => ({
	type: MOVIE_EVENTS.TOGGLE_FILTER,
	payload: {
		isFilterOpen: value
	}
});

export const clearFilters = () => ({
	type: MOVIE_EVENTS.CLEAR_FILTERS,
	payload: {}
});

export const clearFilter = (key) => ({
	type: MOVIE_EVENTS.CLEAR_FILTER,
	payload: { key }
});

export const setSuggestions = suggestions => ({
	type: MOVIE_EVENTS.SET_SUGGESTIONS,
	payload: {
		suggestions
	}
});
