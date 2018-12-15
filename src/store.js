/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';

import ContextReducer from './reducers/contextReducer';
import MoviesReducer from './reducers/moviesReducer';
import ArtistReducer from './reducers/artistReducer';

const reducers = combineReducers({
	context: ContextReducer,
	movies: MoviesReducer,
	artist: ArtistReducer
});

let store = createStore(reducers, applyMiddleware(reduxLogger));

export default store;