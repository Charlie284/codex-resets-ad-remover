import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projects = ["chrome", "firefox"];
const expectedMatch = "https://codex-resets.com/*";
const expectedSizes = [16, 32, 48, 96, 128];

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  assert.equal(buffer.subarray(0, 8).toString("hex"), signature);

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    colorType: buffer[25],
  };
}

for (const project of projects) {
  test(`${project} manifest stays least-privilege and release-complete`, async () => {
    const manifest = JSON.parse(await readFile(`${project}/manifest.json`, "utf8"));

    assert.equal(manifest.manifest_version, 3);
    assert.equal(manifest.version, "1.0.0");
    assert.ok(manifest.name.length <= 75, "store name must stay within 75 characters");
    assert.ok(
      manifest.description.length <= 132,
      "store description must stay within 132 characters",
    );
    assert.equal(manifest.permissions, undefined);
    assert.deepEqual(manifest.content_scripts, [
      {
        matches: [expectedMatch],
        css: ["blocker.css"],
        run_at: "document_start",
      },
    ]);

    for (const size of expectedSizes) {
      assert.equal(manifest.icons[String(size)], `icons/icon-${size}.png`);

      const icon = await readFile(`${project}/icons/icon-${size}.png`);
      const dimensions = pngDimensions(icon);
      assert.deepEqual([dimensions.width, dimensions.height], [size, size]);
      assert.equal(dimensions.colorType, 6, "icon must remain an RGBA PNG");
    }
  });
}

test("Chrome and Firefox blocker policies cannot drift", async () => {
  const [chromeCss, firefoxCss] = await Promise.all([
    readFile("chrome/blocker.css", "utf8"),
    readFile("firefox/blocker.css", "utf8"),
  ]);

  assert.equal(chromeCss, firefoxCss);
});

test("Firefox declares a stable ID and no data collection", async () => {
  const manifest = JSON.parse(await readFile("firefox/manifest.json", "utf8"));
  const gecko = manifest.browser_specific_settings.gecko;
  const geckoAndroid = manifest.browser_specific_settings.gecko_android;

  assert.equal(gecko.id, "codex-resets-ad-remover@charlie284.local");
  assert.equal(gecko.strict_min_version, "140.0");
  assert.equal(geckoAndroid.strict_min_version, "142.0");
  assert.deepEqual(gecko.data_collection_permissions.required, ["none"]);
});

test("store artwork has the required dimensions", async () => {
  const assets = new Map([
    ["assets/icon-master.png", [1024, 1024]],
    ["store-assets/chrome/screenshot-1280x800.png", [1280, 800]],
    ["store-assets/chrome/small-promo-440x280.png", [440, 280]],
    ["store-assets/chrome/marquee-1400x560.png", [1400, 560]],
    ["store-assets/firefox/screenshot-1280x800.png", [1280, 800]],
  ]);

  for (const [asset, expected] of assets) {
    const dimensions = pngDimensions(await readFile(asset));
    assert.deepEqual([dimensions.width, dimensions.height], expected, asset);
  }
});
