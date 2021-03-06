/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { CONTEXT_EVENTS } from '../../constants/events';
import Utils from "../../utils";

const defaultContext = {
	mode: '',
	showLoader: false,
	notify: {
		isOpen: false,
		type: '',
		content: ''
	},
	isMobile: Utils.isMobile(window.innerWidth)
};

const contextReducer = (state = defaultContext, action) => {
	switch (action.type) {
		case CONTEXT_EVENTS.SHOW_NOTIFY: {
			let newState = Utils.copyObject(state);
			newState.notify.content = action.payload.message;
			newState.notify.type = action.payload.type;
			newState.notify.isOpen= true;
			state = newState;
			break;
		}
		case CONTEXT_EVENTS.HIDE_NOTIFY: {
			let newState = Utils.copyObject(state);
			newState.notify.isOpen= false;
			newState.notify.content = '';
			newState.notify.type = '';
			state = newState;
			break;
		}
		default:
			state = Object.assign({}, state, action.payload);
			break;
	}
	return state;
};

export default contextReducer;
