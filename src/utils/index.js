/**
 * @author shreyas.hande on 9/8/18
 *
 */

export default class Utils {
	static getUrlParams = () => {
		let params = {};
		let paramString = window.location.search.replace('?', '');

		if ('' !== paramString) {
			let urlParams = paramString.split('&');
			for(let index in urlParams) {
				if (urlParams.hasOwnProperty(index)) {
					let object = urlParams[index];
					let keyValuePair = object.split('=');
					let key = keyValuePair[0];
					let value = keyValuePair[1];
					let formattedKey = key.replace('[]', '');
					if (-1 !== key.indexOf('[')) {
						if (params.hasOwnProperty(formattedKey)) {
							params[formattedKey].push(value);
						} else {
							params[formattedKey] = [
								value
							];
						}
					} else {
						params[formattedKey] = value;
					}
				}
			}
		}
		return params;
	};

	static getUrlParam = key => {
		let param = '';
		let params = Utils.getUrlParams();
		if (params.hasOwnProperty(key)) {
			param = params[key];
		}
		return param;
	};

	static copyObject = (referencedObject) => JSON.parse(JSON.stringify(referencedObject));

	static ucfirst = (string) => ((string) ? (string[0].toUpperCase() + string.slice(1)) : '');

	static getProtocol = () => (window.location.protocol + '//');

	static getDomain = () => (window.location.hostname);
}
