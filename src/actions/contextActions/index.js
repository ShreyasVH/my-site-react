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