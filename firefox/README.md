# Firefox extension

## Install temporarily

Requires Firefox desktop 140+; the manifest separately declares Firefox Android
142+. These steps cover desktop Firefox and Zen Browser.

1. Open `about:debugging#/runtime/this-firefox`.
2. Select **Load Temporary Add-on**.
3. Choose this directory's `manifest.json`.
4. Open or reload `https://codex-resets.com/`.

Firefox removes temporary extensions when the browser closes. For persistent
installation, the extension must be packaged and signed through Mozilla Add-ons.
The generated Firefox ZIP is unsigned, not a persistent installable add-on.
After local edits, select **Reload** on the add-on's debugging entry, then
reload the website.

Zen Browser uses the same temporary installation flow. For a package suitable
for Mozilla signing, run `npm run package` then `npm run verify:packages` from
the repository root (Node.js 18+, npm, `zip`, and `unzip` required). The archive
is `dist/codex-resets-ad-remover-firefox-<version>.zip`. Signing and submission
are manual; see the [release checklist](../store/README.md).

This extension hides sponsor elements with CSS; it does not block network
requests. See the [root README](../README.md) for scope and development checks.
