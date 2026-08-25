import assert from "node:assert/strict";
import test from "node:test";

const classNames = [
  "sponsor-mobile",
  "sponsor-rail",
  "sponsor-dialog",
  "sponsor-layout",
  "page",
];

test("live sponsor markup still matches the blocker policy", async () => {
  const response = await fetch("https://codex-resets.com/", {
    signal: AbortSignal.timeout(15_000),
  });

  assert.equal(response.ok, true, `unexpected HTTP status ${response.status}`);
  const html = await response.text();

  for (const className of classNames) {
    const classPattern = new RegExp(
      `class=["'][^"']*\\b${className}\\b[^"']*["']`,
    );
    assert.match(html, classPattern, `live page no longer exposes .${className}`);
  }
});
