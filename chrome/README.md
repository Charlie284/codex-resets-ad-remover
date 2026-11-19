# Chrome extension

## Install locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this `chrome` directory.
5. Open or reload `https://codex-resets.com/`.

To pick up local changes, select the extension's reload button on
`chrome://extensions`, then reload the website.

For a store-upload ZIP, run `npm run package` then `npm run verify:packages`
from the repository root (Node.js 18+, npm, `zip`, and `unzip` required). The
archive is `dist/codex-resets-ad-remover-chrome-<version>.zip`, with
`manifest.json` at its root. Packaging does not upload or publish it; follow the
[release checklist](../store/README.md) before submission.

This extension hides sponsor elements with CSS; it does not block network
requests. See the [root README](../README.md) for scope and development checks.
