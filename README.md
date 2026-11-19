# Codex Resets Ad Remover

Two small, standalone browser extensions that remove sponsorship placements from
[`codex-resets.com`](https://codex-resets.com/) without affecting the reset
tracker.

- [`chrome/`](chrome/) contains the Chrome extension.
- [`firefox/`](firefox/) contains the Firefox extension, including Zen Browser.

Each project has its own manifest, blocker stylesheet, icons, and installation
guide. The extensions run only on `https://codex-resets.com/*`, execute no
JavaScript, and request no browser API permissions.

## How it works

Both Manifest V3 builds register `blocker.css` as a CSS content script at
`document_start`. It applies only to `https://codex-resets.com/*`, not HTTP,
subdomains, or other sites:

- `.sponsor-mobile`, `.sponsor-rail`, and `.sponsor-dialog` get
  `display: none !important`.
- At viewport widths from 1024px through 1343px, `.sponsor-layout > .page` gets
  `width: 100% !important` to reclaim space reserved for desktop rails.

This is **cosmetic hiding, not network request blocking**. It does not remove
DOM nodes or stop the website downloading sponsor content. There is no popup,
settings page, background worker, or runtime dependency. Site access comes from
the single-site content-script match. Website markup changes can require
selector updates.

## Install

### Stores and signed builds

The repository includes store-submission materials but provides no published
Chrome Web Store or Firefox Add-ons listing URLs. Check
[GitHub releases](https://github.com/Charlie284/codex-resets-ad-remover/releases)
for downloadable artifacts. If a release supplies a Mozilla-signed XPI, use it
for persistent Firefox installation; the generated Firefox ZIP is unsigned.

### Chrome

1. Download and extract the Chrome ZIP from the latest GitHub release, or clone
   this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode** and select **Load unpacked**.
4. Choose the extracted Chrome package or this repository's `chrome` directory.
5. Open or reload `https://codex-resets.com/`.

After local edits, reload the extension on `chrome://extensions`, then reload
the website. See [Chrome instructions](chrome/README.md).

### Firefox and Zen Browser

The manifest requires Firefox desktop 140+ and separately declares Firefox
Android 142+. These instructions cover desktop Firefox and Zen Browser.

For a temporary development install, clone this repository, open
`about:debugging#/runtime/this-firefox`, select **Load Temporary Add-on**, and
choose `firefox/manifest.json`. Alternatively, extract the Firefox release ZIP
and choose its `manifest.json`. Firefox and Zen remove temporary extensions when
the browser closes. After edits, use **Reload** on the add-on's debugging entry,
then reload the website. See [Firefox instructions](firefox/README.md).

Persistent installation in standard Firefox and Zen builds requires a
Mozilla-signed XPI. An unsigned Firefox ZIP in a GitHub release is source for
testing and Mozilla signing; it is not a persistent installable add-on.

## Development and checks

Run commands from the repository root with **Node.js 18+** and npm. Packaging
requires the system `zip` command; package verification requires `unzip`.
There are no npm package dependencies to install for the offline cycle:

```sh
npm test
npm run package
npm run verify:packages
```

| Command | What it checks or produces | Network |
| --- | --- | --- |
| `npm test` | Manifests, icon/artwork dimensions, Firefox metadata, and CSS parity. | No |
| `npm run package` | Two versioned ZIPs and `dist/SHA256SUMS.txt`. | No |
| `npm run verify:packages` | Archive entries, source bytes, and checksums; package first. | No |
| `npm run test:live` | Fetch live HTML and check five expected class names. | Yes |
| `npm run lint:firefox` | Mozilla `web-ext lint` via `npx --yes`. | May download linter |
| `npm run release:check` | Static → live → lint → package → verify, stopping at first failure. | Yes |

Edit **both** `chrome/blocker.css` and `firefox/blocker.css` when changing
selectors; static tests require byte-identical stylesheets. The live test checks
class presence in HTML, not rendered styles or tracker functionality. Manually
test both browsers at mobile and desktop widths before release.

No `.pre-commit-config.yaml` or `.husky` is configured in this repository;
run checks explicitly.

Before a store submission, run the complete online release gate:

```sh
npm run release:check
```

This runs static and live checks, Mozilla's extension linter, rebuilds both
archives, and proves every packaged byte matches the corresponding source file.

## Package

Packaging copies files without compiling, signing, or uploading them. Each ZIP
contains its browser's manifest, stylesheet, five icons, and root `LICENSE`;
documentation and store artwork are not included. Versions come from each
browser manifest, not `package.json`.

```sh
npm run package
```

This creates versioned Chrome and Firefox ZIP files plus `SHA256SUMS.txt` in
`dist/`. See
[`store/README.md`](store/README.md) for the remaining signing and store steps.

At version 1.0.0, the archives are
`codex-resets-ad-remover-chrome-1.0.0.zip` and
`codex-resets-ad-remover-firefox-1.0.0.zip`. `dist/` is ignored by Git.
For version bumps, keep both manifests, `package.json`, version assertions in
`tests/static.test.mjs`, and release documentation in sync. Store accounts,
signing, review, and publication are external manual steps.

## Project layout

| Path | Purpose |
| --- | --- |
| `chrome/`, `firefox/` | Standalone manifests, stylesheets, icons, installation guides. |
| `scripts/package.mjs` | ZIP creation and SHA-256 generation. |
| `scripts/verify-packages.mjs` | Archive/source/checksum verification. |
| `tests/` | Offline static tests and opt-in live HTML test. |
| `assets/`, `store-assets/` | Master icon and store listing artwork. |
| `store/` | Release checklist, store copy, GitHub release description. |
| `CHANGELOG.md` | Release history. |

See [architecture and packaging flow](docs/ARCHITECTURE.md) for component
boundaries and verification coverage.

## Privacy

The extension does not collect, store, or transmit data. See
[`PRIVACY.md`](PRIVACY.md) for the precise scope of that statement.

## License

Licensed under the [MIT License](LICENSE).
