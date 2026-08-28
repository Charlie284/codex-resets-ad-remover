# Codex Resets Ad Remover

Two small, standalone browser extensions that remove sponsorship placements from
[`codex-resets.com`](https://codex-resets.com/) without affecting the reset
tracker.

- [`chrome/`](chrome/) contains the Chrome extension.
- [`firefox/`](firefox/) contains the Firefox extension, including Zen Browser.

Each project has its own manifest, blocker stylesheet, icons, and installation
guide. The extensions run only on `https://codex-resets.com/*`, execute no
JavaScript, and request no browser API permissions.

## Install manually

### Chrome

1. Download and extract the Chrome ZIP from the latest GitHub release, or clone
   this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode** and select **Load unpacked**.
4. Choose the extracted Chrome package or this repository's `chrome` directory.

### Firefox and Zen Browser

For a temporary development install, clone this repository, open
`about:debugging#/runtime/this-firefox`, select **Load Temporary Add-on**, and
choose `firefox/manifest.json`. Firefox and Zen remove temporary extensions when
the browser closes.

Persistent installation in standard Firefox and Zen builds requires a
Mozilla-signed XPI. An unsigned Firefox ZIP in a GitHub release is source for
testing and Mozilla signing; it is not a persistent installable add-on.

## Verify

The checks require Node.js 18 or newer and have no package dependencies.

```sh
npm test
npm run test:live
```

`npm test` validates both manifests, icon files, and cross-browser stylesheet
parity. `npm run test:live` checks that the selectors used by the blocker still
exist on the live website, so upstream markup drift fails visibly.

Before a store submission, run the complete online release gate:

```sh
npm run release:check
```

This runs static and live checks, Mozilla's extension linter, rebuilds both
archives, and proves every packaged byte matches the corresponding source file.

## Package

```sh
npm run package
```

This creates versioned Chrome and Firefox ZIP files plus `SHA256SUMS.txt` in
`dist/`. See
[`store/README.md`](store/README.md) for the remaining signing and store steps.

## Privacy

The extension does not collect, store, or transmit data. See
[`PRIVACY.md`](PRIVACY.md) for the precise scope of that statement.

## License

Licensed under the [MIT License](LICENSE).
