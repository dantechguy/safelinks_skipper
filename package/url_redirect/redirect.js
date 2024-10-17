// This file handles redirecting when a safelinks.protection.outlook.com URL is requested.

chrome.storage.local.get(['skipped']).then((res) => {
	if (res.hasOwnProperty('skipped')) {
		chrome.storage.local.set({skipped: res.skipped + 1});
	}
});
const queryString = window.location.search;
const parameters = new URLSearchParams(window.location.search);
const encodedUrl = parameters.get('url');

const decodedUrl = decodeURIComponent(encodedUrl);
window.location.replace(decodedUrl);
