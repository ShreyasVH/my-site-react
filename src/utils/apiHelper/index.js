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

		let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

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

		let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

		return ApiHelper.execute({
			method: 'put',
			data,
			url,
			headers
		});
	};

	static execute = options => (axios(options));

	static uploadFile = (file, folder, fileName) => {
		let url = 'https://api.cloudinary.com/v1_1/' + process.env.REACT_APP_CLOUDINARY_ACCOUNT_NAME + '/upload';
		let formData = new FormData();
		formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
		formData.append('file', file);
		formData.append('public_id', fileName);
		formData.append('folder', folder);
		return ApiHelper.post(url, formData, {
			'Content-Type': 'multipart/form-data'
		});
	}
}