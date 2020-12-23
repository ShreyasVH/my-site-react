/**
 * @author shreyas.hande on 9/2/18
 *
 */
import Utils from '../utils';
export const BASE_URL = process.env.API_ENDPOINT;
export const BASE_URL_DUEL_LINKS = process.env.API_ENDPOINT_DUEL_LINKS;
export const BASE_URL_LOGGER = process.env.API_ENDPOINT_LOGGER;
export const BASE_URL_CRICBUZZ = process.env.API_ENDPOINT_CRICBUZZ;
export const GET_MODE_URL = 'data/getMode';
// export const CHANGE_MODE_URL = 'index/changeMode?newMode={newMode}';
export const MOVIES_DASHBOARD_URL = 'movies/dashboard';
export const GET_MOVIES_WITH_FILTERS_URL = 'movies/moviesWithFilter';
export const ACTOR_LIST_URL = 'data/getActorList';
export const DIRECTOR_LIST_URL = 'data/getDirectorList';
export const GET_DELETED_MOVIES = 'data/getDeletedMovies?isPwaRequest=true';
export const GET_MOVIE_DETAILS = 'movies/movie/id/{id}';
export const GET_MOVIE_BY_NAME = 'movies/movies/keyword/{keyword}';

export const GET_CARDS_WITH_FILTERS_URL = 'cards/filters';
export const OBTAIN_CARDS_URL = 'cards/myCards';
export const GET_CARD_BY_NAME = 'cards/keyword/{keyword}';
export const GET_CARD_DETAILS = 'cards/{id}';
export const GET_MY_CARDS = 'cards/myCards/{cardId}';
export const GET_SOURCES_FOR_CARD = 'cards/source/card/{cardId}';

export const GET_LOGS = 'logs/filters';

export const GET_TOURS = 'cricbuzz/tours/filter';
export const GET_TOUR_BY_ID = 'cricbuzz/tours/{id}';
export const GET_SERIES_BY_ID = 'cricbuzz/series/{id}';
export const GET_MATCH_BY_ID = 'cricbuzz/matches/{id}';
export const UPDATE_TOUR = 'cricbuzz/tours/{id}';

export const INPUT_TYPE = {
	TEXTFIELD: 'text',
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	HIDDEN: 'hidden',
	TEXTAREA: 'textarea'
};

export const FILTER_TYPE = {
	CHECKBOX: 'checkbox'
};
