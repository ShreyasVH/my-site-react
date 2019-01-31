/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { BASE_URL, MOVIES_DASHBOARD_URL, GET_MOVIES_WITH_FILTERS_URL, GET_DELETED_MOVIES, GET_MOVIE_DETAILS } from '../../constants';
import ApiHelper from '../apiHelper';
import store from '../../store';
import { updateDashBoard, updateMovieList, clearMovieList, updateFilters, setMovie} from '../../actions/moviesActions';
import Utils from '../index';
import Context from '../context';

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
		let { filters, offset, totalCount, list, sortMap } = movieStore;
		console.log(movieStore);
		if ((-1 === totalCount) || (list.length < totalCount)) {
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
					store.dispatch(updateMovieList(response.movies, response.offset, response.totalCount, shouldReplace));
					Context.hideLoader();
				}
			});
		} else {
			Context.hideLoader();
		}
	};

	static updateFilters = () => {
		let filters = Utils.getUrlParams();
		store.dispatch(updateFilters(filters));
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