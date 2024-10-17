# Remove Outlook Safelinks with Safelinks Skipper

A chrome extension to remove the intrusive, bloating, spyware "Safe Links" feature in Microsoft Outlook.

## What are Safe Links?

Safelinks 1) make your links long and unreadable, and 2) send your website to Microsoft before loading your websites.

By using this extension, you:
- shorten your links back to normal,
- stop Microsoft from seeing websites you visit, and
- speed up your internet browsing, by not sending your websites to Microsoft first.

## What does this extension do?

If you use Outlook on your browser, all links in Outlook will be automatically changed back to their original websites.

If you use desktop Outlook, or click on Safe Links from other applications (such as WhatsApp or Gmail), these links will automatically be changed in your browser as soon as you click.

## Install

**Chrome Web Store (Recommended)**

Visit the extension's [Chrome Store page](https://chrome.google.com/webstore/detail/nojaomiagfnliakjlnhhjogacadihina/) and click "Add to Chrome".

**Local Installation**

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