// This file launches the first-install onboarding html page, and initialises 'enabled' and 'skipped' values.

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
  	chrome.storage.local.get(['skipped', 'enabled']).then(
		(res) => {
	  	if (!res.hasOwnProperty('skipped')) {
			chrome.storage.local.set({skipped: 1});
		}
		if (!res.hasOwnProperty('enabled')) {
			chrome.storage.local.set({enabled: true});
		}
	});
    chrome.tabs.create({
      url: "onboarding/onboarding.html"
    });
  }
});