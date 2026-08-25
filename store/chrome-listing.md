# Chrome Web Store listing

## Name

Codex Resets Ad Remover

## Summary

Removes sponsor cards from codex-resets.com and restores the tracker layout.

## Detailed description

Codex Resets Ad Remover keeps the Codex reset tracker focused on the information
you opened it for. It removes desktop sponsor rails, the mobile sponsor card, and
the sponsorship dialog, then restores the space reserved for those placements.

The extension runs only on codex-resets.com. It contains no JavaScript, requests
no browser API permissions, and does not collect or transmit data.

This is an independent utility and is not affiliated with codex-resets.com or
OpenAI.

## Category

Tools

## Language

English (United States)

## Single purpose

Remove sponsor placements from codex-resets.com without changing the reset
tracker's content or behavior.

## Permission justification

The content-script match grants access only to `https://codex-resets.com/*` so a
static stylesheet can hide the site's sponsor elements. No API permissions are
requested.

## Data use

No data is collected, stored, sold, or transmitted.

In the Privacy practices tab, leave every data-type checkbox unselected and
certify that the disclosures are accurate. The extension does not use remote
code.

## Mature content

No.

## Reviewer notes

The extension has one content script consisting only of `blocker.css`. To test
it, install the submitted ZIP, visit `https://codex-resets.com/`, and confirm
that the desktop sponsor rails, mobile sponsor card, and sponsorship dialog are
not visible while the reset tracker remains functional. No JavaScript executes,
no remote code is loaded, and no browser API permissions are requested.
