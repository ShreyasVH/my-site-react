/**
 * @author shreyas.hande on 9/2/18
 *
 */

import axios from 'axios';

export default class ApiHelper {
	static get = (url, additionalHeaders = {}) => {
		let defaultHeaders = {
			'X-Requested-With': 'XMLHttpRequest'
		};
		let headers = Object.assign({}, defaultHeaders, additionalHeaders);

		return ApiHelper.execute({
			method: 'get',
			url,
			headers
		});
	};

	static post = (url, payload, additionalHeaders = {}) => {
		let defaultHeaders = {
			'X-Requested-With': 'XMLHttpRequest'
		};
		let headers = Object.assign({}, defaultHeaders, additionalHeaders);

		let data = new URLSearchParams();
		for (let key in payload) {
			if (payload.hasOwnProperty(key)) {
				let value = payload[key];
				if (Array.isArray(value)) {
					for(let index in value) {
						if (value.hasOwnProperty(index)) {
							data.append(key + '[]', value[index]);
						}
					}
				} else {
					data.append(key, value);
				}

			}
		}

		return ApiHelper.execute({
			method: 'post',
			data,
			url,
			headers
		});
	};

	static execute = options => (axios(options));
}