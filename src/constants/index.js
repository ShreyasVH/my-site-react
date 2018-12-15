/**
 * @author shreyas.hande on 9/2/18
 *
 */
import Utils from '../utils';

// export const BASE_URL = Utils.getProtocol() + Utils.getDomain();
export const BASE_URL = process.env.API_ENDPOINT;
export const GET_MODE_URL = '/data/getMode';
export const CHANGE_MODE_URL = '/index/changeMode?newMode={newMode}';
export const MOVIES_DASHBOARD_URL = '/data/getMoviesDashboard';
export const ACTOR_LIST_URL = '/data/getActorList';
export const DIRECTOR_LIST_URL = '/data/getDirectorList';
export const GET_MOVIES_WITH_FILTERS_URL = '/data/getMoviesWithFilters';
export const GET_DELETED_MOVIES = '/data/getDeletedMovies?isPwaRequest=true';
export const GET_MOVIE_DETAILS = '/data/getMovieDetails?id={id}';

export const INPUT_TYPE = {
	TEXTFIELD: 'text',
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	HIDDEN: 'hidden',
	TEXTAREA: 'textarea'
};