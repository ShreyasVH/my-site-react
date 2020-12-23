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
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json'
		};
		let headers = Object.assign({}, defaultHeaders, additionalHeaders);

		let data = JSON.stringify(payload);

		return ApiHelper.execute({
			method: 'post',
			data,
			url,
			headers
		});
	};

	static put = (url, payload, additionalHeaders = {}) => {
		let defaultHeaders = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json'
		};
		let headers = Object.assign({}, defaultHeaders, additionalHeaders);

		let data = JSON.stringify(payload);

		return ApiHelper.execute({
			method: 'put',
			data,
			url,
			headers
		});
	};

	static execute = options => (axios(options));
}