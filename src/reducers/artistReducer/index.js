/**
 * @author shreyas.hande on 9/7/18
 *
 */

import { ARTIST_EVENTS } from '../../constants/events';

const defaultState = {
	actorList: [],
	directorList: []
};

const ArtistReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ARTIST_EVENTS.UPDATE_ACTOR_LIST:
			state = Object.assign({}, state, action.payload);
			break;
		case ARTIST_EVENTS.UPDATE_DIRECTOR_LIST:
			state = Object.assign({}, state, action.payload);
	}
	return state;
};

export default ArtistReducer;