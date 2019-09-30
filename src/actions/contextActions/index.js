/**
 * @author shreyas.hande on 9/2/18
 *
 */

import { CONTEXT_EVENTS } from '../../constants/events';

export const updateContext = (context = {}) => ({
	type: CONTEXT_EVENTS.UPDATE_CONTEXT,
	payload: context
});

export const toggleLoader = (showLoader = false) => ({
	type: CONTEXT_EVENTS.TOGGLE_LOADER,
	payload: {
		showLoader
	}
});

export const showNotify = (message, type) => ({
	type: CONTEXT_EVENTS.SHOW_NOTIFY,
	payload: {
		message,
		type
	}
});

export const hideNotify = () => ({
	type: CONTEXT_EVENTS.HIDE_NOTIFY,
	payload: {}
});
