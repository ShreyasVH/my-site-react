/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';

import ContextReducer from './reducers/contextReducer';
import MoviesReducer from './reducers/moviesReducer';
import ArtistReducer from './reducers/artistReducer';
import CardsReducer from './reducers/cardsReducer';

const reducers = combineReducers({
	context: ContextReducer,
	movies: MoviesReducer,
	artist: ArtistReducer,
	cards: CardsReducer
});

let store = createStore(reducers, applyMiddleware(reduxLogger));

export default store;