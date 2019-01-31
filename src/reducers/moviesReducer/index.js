/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { MOVIE_EVENTS } from '../../constants/events';
import Utils from '../../utils';

const defaultState = {
	dashboard: [],
	individual: {},
	list: [],
	filters: {},
	offset: 0,
	totalCount: -1,
	sortMap: {
		name: "ASC"
	}
};

const moviesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case MOVIE_EVENTS.UPDATE_DASHBOARD:
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.UPDATE_MOVIE_LIST:
			let { list, shouldReplace } = action.payload;
			let newList;
			if (shouldReplace) {
				newList = list;
			} else {
				newList = Utils.copyObject(state.list).concat(list);
			}
			state = Object.assign({}, state, {
				list: newList,
				offset: action.payload.offset,
				totalCount: action.payload.totalCount
			});
			break;
		case MOVIE_EVENTS.CLEAR_MOVIE_LIST:
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.UPDATE_FILTERS:
			state = Object.assign({}, state, {
				filters: action.payload
			});
			break;
		case MOVIE_EVENTS.SET_MOVIE:
			state = Object.assign({}, state, action.payload);
	}

	return state;
};

export default moviesReducer;