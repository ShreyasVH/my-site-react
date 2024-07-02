/**
 * @author shreyas.hande on 9/3/18
 *
 */

import {
	BASE_URL,
	MOVIES_DASHBOARD_URL,
	GET_MOVIES_WITH_FILTERS_URL,
	GET_DELETED_MOVIES,
	GET_MOVIE_DETAILS,
	GET_MOVIE_BY_NAME,
	GET_ARTIST_BY_ID,
	UPDATE_ARTIST,
	ADD_ARTIST,
	GET_ALL_LANGUAGES,
	GET_ALL_FORMATS,
	GET_ALL_ARTISTS,
	UPDATE_MOVIE,
	ADD_MOVIE
} from '../../constants';
import ApiHelper from '../apiHelper';
import store from '../../store';
import {
	updateDashBoard,
	updateMovieList,
	clearMovieList,
	updateFilters,
	setMovie,
	setSuggestions,
	setSortMap
} from '../../actions/moviesActions';
import Utils from '../index';
import Context from '../context';
import Filters from '../filters';

export default class Movies {
	static getDashBoard = () => {
		let dashboard = store.getState().movies.dashboard;

		if (0 === dashboard.length) {
			let promise = ApiHelper.get(BASE_URL + MOVIES_DASHBOARD_URL);
			promise.then(apiResponse => {
				let response = apiResponse.data;
				// if (0 !== response.length) {
					store.dispatch(updateDashBoard({
						dashboard: response
					}));
					Context.hideLoader();
				// }
			}).catch(apiResponse => {
				Context.hideLoader();
			});
		} else {
			Context.hideLoader();
		}
	};

	static getMoviesWithFilters = (shouldReplace = true) => {
		let movieStore = store.getState().movies;
		let { filters, totalCount, sortMap } = movieStore;
		let offset;
		if (shouldReplace) {
			offset = 0;
		} else {
			offset = movieStore.offset;
		}

		const booleanFilterKeys = [
			'subtitles',
			'seenInTheatre',
			'obtained'
		];

		let andFilters = {};
		let booleanFilters = {};
		for (const [key, values] of Object.entries(filters)) {
			if (booleanFilterKeys.indexOf(key) !== -1 ) {
				if (values.length === 1) {
					booleanFilters[key] = values[0];
				}
			} else {
				andFilters[key] = values;
			}
		}

		if ((-1 === totalCount) || (offset < totalCount) || shouldReplace) {
			let payload = {
				andFilters,
				booleanFilters,
				sortMap,
				offset,
				count: 24
			};
			let promise = ApiHelper.post(BASE_URL + GET_MOVIES_WITH_FILTERS_URL, payload);
			promise.then(apiResponse => {
				let response = apiResponse.data;
				if (0 !== Object.keys(response).length) {
					Movies.updateUrl();
					store.dispatch(updateMovieList(response.list, response.offset + payload.count, response.totalCount, shouldReplace));
					Filters.closeFilters('movies');
					Context.hideLoader();
				}
			});
		} else {
			Filters.closeFilters('movies');
			Context.hideLoader();
		}
	};

	static updateFilters = () => {
		let urlParams = Utils.getUrlParams();

		let sortMap = {};
		if (urlParams.hasOwnProperty('order')) {
			const sortString = urlParams['order'];
			delete urlParams['order'];
			const sortParams = sortString.split(',');
			sortMap = sortParams.reduce((object, value) => {
				const parts = value.split(' ');
				if (parts.length === 2) {
					object[parts[0]] = parts[1];
				}
				return object;
			}, {});
		}
		store.dispatch(setSortMap(sortMap));

		delete urlParams.order;
		store.dispatch(updateFilters(urlParams));
	};

	static updateUrl = () => {
		let url = Movies.getUrlFromFilters();
		if (url !== decodeURI(window.location.pathname + window.location.search)) {
			window.history.pushState(null, "Browse with filters", url);
		}
	};

	static getUrlFromFilters = () => {
		let storeValues = store.getState();
		let movieStore = storeValues.movies;
		let filters = movieStore.filters;
		let sortMap = movieStore.sortMap;

		let urlParams = [];

		for (const key in filters) {
			if (filters.hasOwnProperty(key)) {
				let values = filters[key];
				for (const index in values) {
					if (values.hasOwnProperty(index)) {
						let value = values[index];
						urlParams.push(key + "[]=" + value);
					}
				}
			}
		}

		let queryString = urlParams.join("&");

		let sortParams = [];
		for (const key in sortMap) {
			if (sortMap.hasOwnProperty(key)) {
				let value = sortMap[key];
				sortParams.push(key + " " + value);
			}
		}
		let sortString = "order=" + sortParams.join("&");

		queryString = (('' !== queryString) ? (queryString + "&" + sortString) : (sortString));
		return window.location.pathname + "?" + queryString;
	};

	static clearList = () => {
		store.dispatch(clearMovieList());
	};

	static getDeletedMovies = () => {
		let promise = ApiHelper.get(BASE_URL + GET_DELETED_MOVIES);
		promise.then(apiResponse => {
			let response = apiResponse.data;
			if (response.hasOwnProperty('movieList')) {
				store.dispatch(updateMovieList(response.movieList, response.movieList.length, response.movieList.length, true));
				Context.hideLoader();
			}
		});
	};

	static loadMovieDetails = (id) => {
		let promise = Movies.getMovieDetails(id);
		promise.then(apiResponse => {
			let response = apiResponse.data;
			if (0 !== Object.keys(response).length) {
				store.dispatch(setMovie(response));
				Context.hideLoader();
			}
		});
	};

	static getMovieDetails = id => {
		return ApiHelper.get(BASE_URL + GET_MOVIE_DETAILS.replace('{id}', id))
	}

	static clearMovieDetails = () => {
		store.dispatch(setMovie({}));
	};

	static getSuggestions = event => {
		let keyword = event.target.value;

		if (keyword.length >= 3) {
			let promise = ApiHelper.get(BASE_URL + GET_MOVIE_BY_NAME.replace('{keyword}', keyword));
			promise.then(apiResponse => {
				if (apiResponse.hasOwnProperty('data')) {
					let suggestions = apiResponse.data;
					store.dispatch(setSuggestions(suggestions));
				}
			});
		} else {
			let currentSuggestions = store.getState().movies.suggestions;
			if (currentSuggestions.length > 0) {
				store.dispatch(setSuggestions([]));
			}
		}
	}

	static getArtist = (id) => {
		return ApiHelper.get(BASE_URL + GET_ARTIST_BY_ID.replace('{id}', id));
	};

	static updateArtist = (id, payload) => {
		return ApiHelper.put(BASE_URL + UPDATE_ARTIST.replace('{id}', id), payload);
	};

	static addArtist = (payload) => {
		return ApiHelper.post(BASE_URL + ADD_ARTIST, payload);
	};

	static getAllLanguages = () => {
		return ApiHelper.get(BASE_URL + GET_ALL_LANGUAGES);
	};

	static getAllFormats = () => {
		return ApiHelper.get(BASE_URL + GET_ALL_FORMATS);
	};

	static getAllArtists = async () => {
		const count = 100;
		let offset = 0;
		let totalCount = 0;
		let artists = [];

		do {
			const response = await ApiHelper.get(BASE_URL + GET_ALL_ARTISTS.replace('{offset}', offset).replace('{count}', count));
			const data = response.data;
			totalCount = data.totalCount;
			artists = artists.concat(data.list);
			offset += count;
		} while (offset < totalCount);

		return artists;
	};

	static updateMovie = (id, payload) => {
		return ApiHelper.put(BASE_URL + UPDATE_MOVIE.replace('{id}', id), payload);
	};

	static addMovie = (payload) => {
		return ApiHelper.post(BASE_URL + ADD_MOVIE, payload);
	};
}
