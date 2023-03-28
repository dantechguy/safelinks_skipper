# SafeLinks Skipper

A chrome extension which skips the the intrusive, bloating, spyware "Safe Links" feature that Microsoft offers.

## What it does

**HTML Link Replacement**

Inside the web Outlook client, any hyperlinks you hover over will be replaced with the de-obfuscated URL, taking you directly to the website instead.

**Request Redirecting**

Any `*.safelinks.protection.outlook.com` links you do click on will be redirected before they leave your browser, bringing you directly to the website instead. This means that all safe links regardless of origin (desktop email client, messaging services, other websites, etc) are skipped.

## How to Install

**Install Locally**

1. Download this repo
2. Go to the URL `chrome://extensions/`
3. Turn on the "Developer mode" toggle
4. Click the "Load unpacked" button
5. Select downloaded folder
6. Copy the extension's ID from the box that's just been added to the extensions page. It'll be a random string of characters like: `dcfnmfabnpkeiefelfmhgjmekdjdfhil`.
7. Go to the downloaded folder again, and inside `url_redirect/rule.json` replace the `PASTE EXTENSION ID HERE` with the ID you copied (keeping the quotation marks)
8. Go back to the extensions page and reload the extension (click the reload icon inside its box)
9. If you have the Outlook web client open, reload that page.
10. You're good to go!