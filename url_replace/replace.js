// This file 


chrome.storage.local.get(['enabled']).then((res) => {
	if (res.hasOwnProperty('enabled') && res.enabled) {
		document.addEventListener('pointerover', tryReplaceHyperlinkUrl);
	}
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.hasOwnProperty('enabled')) {
		if (changes.enabled.newValue) {
			document.addEventListener('pointerover', tryReplaceHyperlinkUrl);
		} else {
			document.removeEventListener('pointerover', tryReplaceHyperlinkUrl);
		}
	}
});

function tryReplaceHyperlinkUrl(event) {
	let el = event.target;
	if (el.tagName == 'A') {
		if (isSafeLinksUrl(el.href)) {
			el.href = replaceSafeLinksUrl(el.href);
			incrementCounter();
		}
		if (isSafeLinksUrl(el.innerHTML)) {
			el.innerHTML = replaceSafeLinksUrl(el.innerHTML);
			incrementCounter();
		}
	}
}

function isSafeLinksUrl(url) {
	try {
		let parsedUrl = new URL(url);
		return parsedUrl.hostname.endsWith('safelinks.protection.outlook.com')
			&& parsedUrl.pathname === '/'
			&& parsedUrl.protocol === 'https:';
	} catch (e) {
		if (e instanceof TypeError)
			return false;
		else throw e;
	}
}

function replaceSafeLinksUrl(url) {
	const parameters = new URL(url).searchParams;
	const encodedUrl = parameters.get('url');
	const decodedUrl = decodeURIComponent(encodedUrl);
	return decodedUrl;
}

function incrementCounter() {
	chrome.storage.local.get(['skipped']).then((res) => {
		if (res.hasOwnProperty('skipped'))
			chrome.storage.local.set({skipped: res.skipped + 1});
	});
}