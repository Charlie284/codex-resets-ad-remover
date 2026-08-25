# Codex Resets Ad Remover

Two small, standalone browser extensions that remove sponsorship placements from
[`codex-resets.com`](https://codex-resets.com/) without affecting the reset
tracker.

- [`chrome/`](chrome/) contains the Chrome extension.
- [`firefox/`](firefox/) contains the Firefox extension, including Zen Browser.

Each project has its own manifest, blocker stylesheet, icons, and installation
guide. The extensions run only on `https://codex-resets.com/*`, execute no
JavaScript, and request no browser API permissions.

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
