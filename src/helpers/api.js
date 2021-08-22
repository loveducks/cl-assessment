let jwt = null;
let dispatch = null;
const API_URL = "";

export function setJwt(newJwt) {
	jwt = newJwt;
}

export function setDispatch(fn) {
	dispatch = fn;
}

export function apiCall(
	url,
	method = "GET",
	payload = {},
	contentType,
	header = {}
) {
	let headers = new Headers();

	headers.set("Content-Type", "application/json; charset=utf-8");
	// Hey developer, please don't remove these headers as they are the one keeping IE in leash
	// And, believe me you don't want IE to unleash
	headers.set("Cache-control", "private, max-age=0, no-cache, no-store");
	headers.set(
		"Authorization",
		`Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
	);
	// headers.set("pragma", "no-cache")
	for (const [key, value] of Object.entries(header)) {
		// console.log("key", key)
		// console.log("value", value)
		headers.set(key, value);
	}

	let options = {
		method,
		headers,
		credentials: "include",
	};
	// console.log("options", options)
	if (method === "POST" || method === "PUT") {
		options.body = JSON.stringify(payload);
	}

	if (contentType === "text/html") {
		/* global Raven */
		return fetch(url, options)
			.then((r) => {
				return r.status === 200 ? r.blob() : r.json();
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	} else {
		return fetch(API_URL + url, options)
			.then((r) => {
				return r.text().then((text) => {
					return text ? JSON.parse(text) : {};
				});
			})
			.catch((err) => {
				console.log("fetch error", err);
				throw err;
			})
			.then((r) => {
				r.jwt && setJwt(r.jwt);
				return r;
			});
	}
}

export function put(url, payload, contentType, header = {}) {
	return apiCall(url, "PUT", payload, contentType, header);
}

export function post(url, payload, contentType, header = {}) {
	return apiCall(url, "POST", payload, contentType, header);
}

export function get(url, contentType, header = {}) {
	return apiCall(url, "GET", null, contentType, header);
}
