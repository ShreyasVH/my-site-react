/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { CONTEXT_EVENTS } from '../../constants/events';

const defaultContext = {
	mode: '',
	showLoader: false
};

const contextReducer = (state = defaultContext, action) => {
	switch (action.type) {
		case CONTEXT_EVENTS.UPDATE_CONTEXT:
			state = Object.assign({}, state, action.payload);
			break;
		case CONTEXT_EVENTS.TOGGLE_LOADER:
			state = Object.assign({}, state, action.payload);
			break;
	}
	return state;
};

export default contextReducer;