# Release checklist

## Local release candidate

1. Run `npm run release:check` while online.
2. Confirm that `dist/SHA256SUMS.txt` contains both upload archives.
3. Load each packaged build in its target browser and verify the live site at
   mobile and desktop widths.

The release gate verifies that `manifest.json` is at the archive root, rejects
unexpected files, and compares every packaged file byte-for-byte with source.

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
