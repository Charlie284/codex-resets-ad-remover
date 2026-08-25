# Chrome extension

## Install locally

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this `chrome` directory.
5. Open or reload `https://codex-resets.com/`.

To pick up local changes, select the extension's reload button on
`chrome://extensions`, then reload the website.

For a store-ready ZIP, run `npm run package` from the repository root. The
generated archive is written to `dist/` with `manifest.json` at its root.
