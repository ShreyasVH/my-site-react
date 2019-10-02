/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { BASE_URL, MOVIES_DASHBOARD_URL, GET_MOVIES_WITH_FILTERS_URL, GET_DELETED_MOVIES, GET_MOVIE_DETAILS } from '../../constants';
import ApiHelper from '../apiHelper';
import store from '../../store';
import {
	updateDashBoard,
	updateMovieList,
	clearMovieList,
	updateFilters,
	setMovie,
	toggleFilters,
	resetTempFilters,
	clearFilters,
	clearFilter
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
				if (0 !== response.length) {
					store.dispatch(updateDashBoard({
						dashboard: response
					}));
					Context.hideLoader();
				}
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

		if ((-1 === totalCount) || (offset < totalCount) || shouldReplace) {
			let payload = {
				filters,
				sortMap,
				offset,
				count: 24
			};
			let promise = ApiHelper.post(BASE_URL + GET_MOVIES_WITH_FILTERS_URL, payload);
			promise.then(apiResponse => {
				let response = apiResponse.data;
				if (0 !== Object.keys(response).length) {
					Movies.updateUrl();
					store.dispatch(updateMovieList(response.movies, response.offset, response.totalCount, shouldReplace));
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
		delete urlParams.order;
		store.dispatch(updateFilters(urlParams));
	};

	static updateUrl = () => {
		let url = Movies.getUrlFromFilters();
		history.pushState(null, "Browse with filters", url);
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
		return location.pathname + "?" + queryString;
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

	static getMovieDetails = (id) => {
		let promise = ApiHelper.get(BASE_URL + GET_MOVIE_DETAILS.replace('{id}', id));
		promise.then(apiResponse => {
			let response = apiResponse.data;
			if (0 !== Object.keys(response).length) {
				store.dispatch(setMovie(response));
				Context.hideLoader();
			}
		});
	};

	static clearMovieDetails = () => {
		store.dispatch(setMovie({}));
	};
}
