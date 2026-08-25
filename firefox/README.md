# Firefox extension

## Install temporarily

1. Open `about:debugging#/runtime/this-firefox`.
2. Select **Load Temporary Add-on**.
3. Choose this directory's `manifest.json`.
4. Open or reload `https://codex-resets.com/`.

Firefox removes temporary extensions when the browser closes. For persistent
installation, the extension must be packaged and signed through Mozilla Add-ons.

Zen Browser uses the same temporary installation flow. For a package suitable
for Mozilla signing, run `npm run package` from the repository root.
