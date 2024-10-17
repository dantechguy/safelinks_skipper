// This file handles replacing the HTML href attribute of <a> tags inside the Outlook web client.

const mutCallback = leadingEdgeThrottle(checkAndReplaceSafeLinksInWholeDOM, 300);
const mutObs = new MutationObserver(mutCallback);


chrome.storage.local.get(['enabled']).then((res) => {
	if (res.hasOwnProperty('enabled')) {
		if (res.enabled) {
			startListeningToDOMChanges();
		}
	} else {
		chrome.storage.local.set({enabled: true});
	}
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.hasOwnProperty('enabled')) {
		if (changes.enabled.newValue) {
			startListeningToDOMChanges();
			checkAndReplaceSafeLinksInWholeDOM();
		} else {
			stopListeningToDOMChanges();
		}
	}
});

function startListeningToDOMChanges() {
	mutObs.observe(document.body, {
	    subtree: true,
	    childList: true,
	    attributes: true,
	    attributeFilter: ['href'],
	});
}

const stopListeningToDOMChanges = () => mutObs.disconnect();

function checkAndReplaceSafeLinksInWholeDOM() {
	const allAnchorElements = document.getElementsByTagName('a');
	for (const node of allAnchorElements) {
		tryReplaceAnchorTagSafeLink(node);
	}
}

function tryReplaceAnchorTagSafeLink(el) {
	if (el.tagName === 'A') {
		const hrefIsSafelink = isSafeLinksUrl(el.href);
		const textIsSafelink = isSafeLinksUrl(el.textContent);
		const tooltipUrl = hrefIsSafelink ? el.href : el.textContent;

		if (hrefIsSafelink) {
			el.href = decodeSafeLinksUrl(el.href);
		}
		if (textIsSafelink) {
			el.textContent = decodeSafeLinksUrl(el.textContent);
		}

		if (hrefIsSafelink || textIsSafelink) {
			incrementCounter();
			el.setAttribute('title', '✅ Safelinks Skipper automatically removed the Safe Link from this URL')
			removeAllEventListeners(el);
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

function decodeSafeLinksUrl(url) {
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

function removeAllEventListeners(el) {
	const cleanEl = el.cloneNode(true);
	el.parentNode.replaceChild(cleanEl, el);
}

// --- UTILIY ---

function leadingEdgeThrottle(callback, wait) {
	let timer = null;
	return (...args) => {
		if (timer === null) {
			callback(...args);
			timer = setTimeout(() => {
				timer = null;
				callback(...args);
			}, wait);
		}
	}
}

// Due to `"run_at": "document_idle"` in manifest.json, this content script
//  only runs after the DOM has finished loading.
checkAndReplaceSafeLinksInWholeDOM();