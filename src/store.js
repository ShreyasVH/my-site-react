/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';

import ContextReducer from './reducers/contextReducer';
import MoviesReducer from './reducers/moviesReducer';
import ArtistReducer from './reducers/artistReducer';
import CardsReducer from './reducers/cardsReducer';
import LogsReducer from './reducers/logsReducer';
import CricReducer from './reducers/cricReducer';

const reducers = combineReducers({
	context: ContextReducer,
	movies: MoviesReducer,
	artist: ArtistReducer,
	cards: CardsReducer,
	logs: LogsReducer,
	cric: CricReducer
});

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;