const initOptions = {domain: window.location.hostname, path: '/', expires: 0};

const get = (name) => {
	let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? decodeURIComponent(value[2]) : null;
}

const set = (name, value, options) => {
	options = options || initOptions;
	if (!name) return false;
	if (typeof value === 'undefined' || value === null) {
		options.expires = -1;
	}

	let expires = '; expires=' + options.expires;
	if (typeof options.expires === 'number' && options.expires !== 0) {
		const date = new Date();
		date.setTime(date.getTime() + (options.expires * 1000));

		expires = '; expires=' + date.toUTCString();
	}
	const path = '; path=' + (options.path ? options.path : initOptions.path);
	const domain = '; domain=' + (options.domain ? options.domain : initOptions.domain);
	const secure = options.secure ? '; secure' : '';
	document.cookie = [name, '=', value, expires, path, domain, secure].join('');
}

const clear = () => {
	const cookies = document.cookie.split(';');

	const date = new Date();
	date.setTime(date.getTime() + (-1 * 1000));

	const expires = '; expires=' + date.toUTCString();
	const path = initOptions.path ? '; path=' + (initOptions.path) : '';
	const domain = initOptions.domain ? '; domain=' + (initOptions.domain) : '';
	const secure = initOptions.secure ? '; secure' : '';
	const value = '';

	for(let i=0; i < cookies.length; i++) {
		let name = cookies[i].split('=')[0];
		document.cookie = [name, '=', value, expires, path, domain, secure].join('');
	}
}

export default {get, set, clear}