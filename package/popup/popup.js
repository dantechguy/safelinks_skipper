// This file handles the logic to display the extension's popup window and toggle if its enabled.

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
		document.getElementById('onoff').textContent = 'ON';
		document.querySelector('#switch input').checked = true;
		chrome.action.setIcon({path: '../icons/icon.png'});
		chrome.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: ['safelinks']
		});
	} else {
		document.getElementById('onoff').textContent = 'OFF';
		document.querySelector('#switch input').checked = false;
		chrome.action.setIcon({path: '../icons/icon-grey.png'});
		chrome.declarativeNetRequest.updateEnabledRulesets({
			disableRulesetIds: ['safelinks']
		});
	}
}

document.getElementById('switch').addEventListener('change', () => {
	chrome.storage.local.get(['enabled']).then((res) => {
		if (res.hasOwnProperty('enabled')) {
			chrome.storage.local.set({enabled: !res.enabled});
		}
	});
});