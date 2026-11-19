# Release checklist

## Local release candidate

Run commands from the repository root with Node.js 18+, npm, `zip`, and `unzip`.
The offline cycle is `npm test`, `npm run package`, then
`npm run verify:packages`; no npm dependencies need installing. The online gate
also fetches the live site and runs `npx --yes web-ext lint`, which may download
the linter. It stops at the first failure.

For version bumps, update both manifests, `package.json`, version assertions in
`tests/static.test.mjs`, and versioned release copy/checklist examples below.
Archive filenames use each manifest's version, not `package.json`.

1. Run `npm run release:check` while online.
2. Confirm that `dist/SHA256SUMS.txt` contains both upload archives.
3. Load each packaged build in its target browser and verify the live site at
   mobile and desktop widths.

The release gate verifies that `manifest.json` is at the archive root, rejects
unexpected files, and compares every packaged file byte-for-byte with source.
Each ZIP contains only the manifest, stylesheet, five icons, and root `LICENSE`.
Documentation and store artwork are excluded.

Extract Chrome's ZIP for **Load unpacked**; extract Firefox's ZIP and select
its manifest for temporary installation. The live HTML test only checks class
presence, not rendered behavior; it does not replace the browser checks above.

## GitHub self-distribution

1. Create a `v1.0.0` release from the verified `main` commit.
2. Attach the Chrome ZIP, Firefox ZIP, and `SHA256SUMS.txt` from `dist/`.
3. Use `store/github-release.md` as the release description.
4. Mark the Chrome ZIP as an unpacked developer-mode installation.
5. Mark the unsigned Firefox ZIP as source/testing material, not a persistent
   Firefox or Zen installation.
6. When Mozilla returns a signed XPI, test it in Firefox and Zen and attach it
   to the release as the persistent-install option.

## Chrome Web Store

1. Upload the generated Chrome ZIP.
2. Use `assets/icon-master.png` as the source for the listing icon.
3. Upload `store-assets/chrome/screenshot-1280x800.png` and
   `store-assets/chrome/small-promo-440x280.png`. The optional marquee asset is
   `store-assets/chrome/marquee-1400x560.png`.
4. Paste the copy from `store/chrome-listing.md`.
5. Declare the single-site content-script access and no data collection in the
   Privacy practices tab.
6. Complete every disclosure in the Privacy practices tab. If the dashboard
   requests a privacy-policy URL, publish the text in `PRIVACY.md` at a public
   HTTPS URL before submission.
7. Submit for review only after checking the final listing preview.

## Firefox Add-ons

1. Upload the generated Firefox ZIP to the AMO Developer Hub.
2. Paste the copy from `store/firefox-listing.md`.
3. Declare that no data is collected or transmitted.
4. Select **No** when asked whether a separate source archive is required; the
   ZIP is already complete, human-readable source with no build step.
5. Upload `store-assets/firefox/screenshot-1280x800.png` as the listing
   screenshot.
6. Download and test the Mozilla-signed XPI.
7. Publish only after verifying the signed build in Firefox and Zen Browser.

Signing, developer-account configuration, listing submission, and publication
are intentionally external steps and are not performed by the build scripts.
