NEXT STEP:
- "This page has been blocked by Chrome" may be solved by adding HTML redirect page to https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources. ATM the manifest is broken.
	- Outlook clickjacks you, and inserts ANOTHER safelink checker via JS. The first safelink checker is not detected by the extension.
	- Then, when the actual inner safelink resolves, then it gets blocked, but fails.

- [ ] Improve outlook web link updater
	- [x] Use `MutationObserver` or an alternative to update links, instead of hover
		- [ ] Disable mutation observer when modifying the 'a' links ourselves?
	- [x] To improve performance, debounce mutations.
	- [ ] Visually show link change to show user that work is being done.
		- [ ] Remove tooltop
- [ ] Make redirection more obvious. It saves the user time.
- [ ] Improve popup toggle
	- [ ] Have big toggle switch instead of clickable logo
	- [ ] Make counter look nicer
- [ ] Go online and answer top forum questions with link to extension
- Improve storefront
	- [x] Improve logo
	- [x] Banner: single image with macos outlook style preview, drop shadow window, single simple arrow.
	- [x] Description, include variant of "safe(\_)link(s)" which boosts search result visibility
- [x] Update onboarding

Extension visibility considerations:
- I want people to see and remember that they're using the extension. In 1 years time I don't you to have forgotten, and uninstall it accidentally, or be frustrated or confused as to why Outlook is behaving differently.
- If someone with the extension opens their email on a different laptop, I want them to realise something is missing.
- I want new users to see an extension user's Outlook and want to download the extension for themselves.


- BUT, I don't want to work on this forever. I think I'll add the tooltip and update the popup and that's it.