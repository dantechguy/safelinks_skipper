chrome.storage.local.get(['skipped', 'enabled']).then(
	(res) => {
		if (res.hasOwnProperty('skipped')) {
			showSkippedCount(res.skipped);
		} else {
			chrome.storage.local.set({skipped: 0});
		}
		if (res.hasOwnProperty('enabled')) {
			updateEnabled(res.enabled);
		} else {
			chrome.storage.local.set({enabled: true});
		}
	}
);

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.hasOwnProperty('skipped')) {
		showSkippedCount(changes.skipped.newValue);
	}
	if (changes.hasOwnProperty('enabled')) {
		updateEnabled(changes.enabled.newValue);
	}
});

function showSkippedCount(n) {
	document.getElementById('skipped').textContent = n;
}

function updateEnabled(enabled) {
	if (enabled) {
		document.getElementById('icon').classList.remove('grey');
		chrome.action.setIcon({path: '../icons/icon.png'});
		chrome.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: ['safelinks']
		});
	} else {
		document.getElementById('icon').classList.add('grey');
		chrome.action.setIcon({path: '../icons/icon_disabled.png'});
		chrome.declarativeNetRequest.updateEnabledRulesets({
			disableRulesetIds: ['safelinks']
		});
	}
}

document.getElementById('icon').addEventListener('click', () => {
	chrome.storage.local.get(['enabled']).then((res) => {
	if (res.hasOwnProperty('enabled'))
		chrome.storage.local.set({enabled: !res.enabled});
	});
});