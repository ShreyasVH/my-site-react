/**
 * @author shreyas.hande on 9/2/18
 *
 */

import store from '../../store';
import {
	updateContext,
	toggleLoader,
	showNotify,
	hideNotify
} from '../../actions/contextActions';
import ApiHelper from '../apiHelper';
import { BASE_URL, GET_MODE_URL } from '../../constants';

export default class Context {
	static initializeContext = () => {
		let promise = ApiHelper.get(BASE_URL + GET_MODE_URL);
		promise.then(apiResponse => {
			let response = apiResponse.data;
			if (response.hasOwnProperty('mode')) {
				store.dispatch(updateContext({
					mode: response.mode
				}));
			}
		});
	};

	static changeMode = newMode => {
		ApiHelper.get((BASE_URL).replace('{newMode}', newMode));
	};

	static showLoader = () => {
		store.dispatch(toggleLoader(true));
		let body = document.getElementsByTagName('body');
		body[0].style['overflow-y'] = 'hidden';
	};

	static hideLoader = () => {
		store.dispatch(toggleLoader(false));
		let body = document.getElementsByTagName('body');
		body[0].style['overflow-y'] = 'auto';
	};

	static closeNotify = () => {
		store.dispatch(hideNotify());
	};

	static showNotify = (message, type) => {
		store.dispatch(showNotify(message, type));
	}

	static updateContext = payload => {
		store.dispatch(updateContext(payload));
	}
}
