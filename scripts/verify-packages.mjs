import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const packageFiles = [
  "manifest.json",
  "blocker.css",
  "icons/icon-16.png",
  "icons/icon-32.png",
  "icons/icon-48.png",
  "icons/icon-96.png",
  "icons/icon-128.png",
  "LICENSE",
];
const expectedChecksums = [];

function unzip(arguments_) {
  const result = spawnSync("unzip", arguments_, {
    cwd: root,
    encoding: arguments_[0] === "-Z1" ? "utf8" : null,
    maxBuffer: 10 * 1024 * 1024,
  });

  assert.equal(
    result.status,
    0,
    result.stderr?.toString() || `unzip exited with status ${result.status}`,
  );
  return result.stdout;
}

for (const project of ["chrome", "firefox"]) {
  const manifest = JSON.parse(
    await readFile(path.join(root, project, "manifest.json"), "utf8"),
  );
  const archiveName = `codex-resets-ad-remover-${project}-${manifest.version}.zip`;
  const archive = path.join(root, "dist", archiveName);
  const entries = unzip(["-Z1", archive])
    .trim()
    .split("\n");

  assert.deepEqual(entries, packageFiles, `${archiveName} has unexpected files`);

  for (const file of packageFiles) {
    const source = await readFile(
      file === "LICENSE" ? path.join(root, file) : path.join(root, project, file),
    );
    const packaged = unzip(["-p", archive, file]);
    assert.equal(
      Buffer.compare(source, packaged),
      0,
      `${archiveName}:${file} does not match source`,
    );
  }

  const digest = createHash("sha256")
    .update(await readFile(archive))
    .digest("hex");
  expectedChecksums.push(`${digest}  ${archiveName}`);
  console.log(`${archiveName}: verified`);
}

const checksums = await readFile(path.join(root, "dist", "SHA256SUMS.txt"), "utf8");
assert.equal(checksums, `${expectedChecksums.join("\n")}\n`);
console.log("SHA256SUMS.txt: verified");
