/**
 * @author shreyas.hande on 9/2/18
 *
 */
import Utils from '../utils';
export const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
export const BASE_URL_DUEL_LINKS = process.env.REACT_APP_API_ENDPOINT_DUEL_LINKS;
export const BASE_URL_LOGGER = process.env.REACT_APP_API_ENDPOINT_LOGGER;
export const BASE_URL_CRICBUZZ = process.env.REACT_APP_API_ENDPOINT_CRICBUZZ;
export const BASE_URL_POGO = process.env.REACT_APP_API_ENDPOINT_POGO;
export const GET_MODE_URL = 'data/getMode';
// export const CHANGE_MODE_URL = 'index/changeMode?newMode={newMode}';
export const MOVIES_DASHBOARD_URL = 'movies/dashboard';
export const GET_MOVIES_WITH_FILTERS_URL = 'movies/filter';
export const ACTOR_LIST_URL = 'data/getActorList';
export const DIRECTOR_LIST_URL = 'data/getDirectorList';
export const GET_DELETED_MOVIES = 'data/getDeletedMovies?isPwaRequest=true';
export const GET_MOVIE_DETAILS = 'movies/{id}';
export const GET_MOVIE_BY_NAME = 'movies/keyword/{keyword}';
export const GET_ALL_LANGUAGES = 'languages';
export const GET_ALL_FORMATS = 'formats';
export const UPDATE_MOVIE = 'movies/{id}';
export const ADD_MOVIE = "movies"


export const GET_ARTIST_BY_ID = 'artists/{id}'
export const UPDATE_ARTIST = 'artists/{id}'
export const ADD_ARTIST = 'artists'
export const GET_ALL_ARTISTS = 'artists/{offset}/{count}';

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
export const UPDATE_SERIES = 'cricbuzz/series/{id}';
export const GET_MATCH_BY_ID = 'cricbuzz/matches/{id}';
export const UPDATE_TOUR = 'cricbuzz/tours/{id}';
export const GET_STADIUM_BY_ID = 'cricbuzz/stadiums/{id}';
export const GET_ALL_COUNTRIES = 'cricbuzz/countries';
export const GET_ALL_STADIUMS = 'cricbuzz/stadiums';
export const UPDATE_STADIUM = 'cricbuzz/stadiums/{id}';
export const GET_COUNTRY_BY_ID = 'cricbuzz/countries/{id}';
export const UPDATE_COUNTRY = 'cricbuzz/countries/{id}';
export const CREATE_COUNTRY = 'cricbuzz/countries';
export const GET_TEAM_BY_ID = 'cricbuzz/teams/{id}';
export const UPDATE_TEAM = 'cricbuzz/teams/{id}';
export const GET_PLAYER_BY_ID = 'cricbuzz/players/{id}';
export const UPDATE_PLAYER = 'cricbuzz/players/{id}';
export const GET_ALL_TEAMS = 'cricbuzz/teams';
export const GET_ALL_PLAYERS = 'cricbuzz/players/all/{offset}/{count}';
export const CREATE_MATCH = 'cricbuzz/matches';
export const GET_YEARS = 'cricbuzz/tours/years';
export const GET_STATS = 'cricbuzz/stats';
export const GET_SCORES = 'cricbuzz/players/scores';

export const GEM_MON_BY_NUMBER = 'pogo/pokemon/num/{number}';
export const GET_ALL_POKEMONS = 'pogo/pokemon/all';
export const UPDATE_POKEMON = 'pogo/pokemon/{number}';

export const GET_ALL_REGIONS = 'pogo/regions';
export const GET_ALL_TYPES = 'pogo/types';

export const GET_FORM_BY_ID = 'pogo/forms/{id}';
export const UPDATE_FORM = 'pogo/forms/{id}';
export const GET_FORMS_WITH_FILTER = 'pogo/forms/filter';
export const CREATE_FORM = 'pogo/forms';

export const GET_EVENT_BY_ID = 'pogo/events/{id}';
export const UPDATE_EVENT = 'pogo/events/{id}';
export const CREATE_EVENT = 'pogo/events';
export const GET_EVENTS_WITH_FILTER = 'pogo/events/filter';

export const INPUT_TYPE = {
	TEXTFIELD: 'text',
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	HIDDEN: 'hidden',
	TEXTAREA: 'textarea'
};

export const FILTER_TYPE = {
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	RANGE: 'range'
};

export const BASE_FILTER_TYPE = {
	AND: 'and',
	BOOLEAN: 'boolean'
};
