import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const packageFiles = [
  "manifest.json",
  "blocker.css",
  "icons/icon-16.png",
  "icons/icon-32.png",
  "icons/icon-48.png",
  "icons/icon-96.png",
  "icons/icon-128.png",
];

await mkdir(dist, { recursive: true });
const archives = [];

for (const project of ["chrome", "firefox"]) {
  const projectRoot = path.join(root, project);
  const manifest = JSON.parse(
    await readFile(path.join(projectRoot, "manifest.json"), "utf8"),
  );
  const temporaryDirectory = await mkdtemp(
    path.join(tmpdir(), `codex-resets-${project}-`),
  );
  const temporaryArchive = path.join(temporaryDirectory, "package.zip");
  const finalArchive = path.join(
    dist,
    `codex-resets-ad-remover-${project}-${manifest.version}.zip`,
  );

  try {
    const result = spawnSync(
      "zip",
      ["-q", "-X", temporaryArchive, ...packageFiles],
      { cwd: projectRoot, encoding: "utf8" },
    );

    if (result.status !== 0) {
      throw new Error(result.stderr || `zip exited with status ${result.status}`);
    }

    const licenseResult = spawnSync(
      "zip",
      ["-q", "-X", "-j", temporaryArchive, path.join(root, "LICENSE")],
      { cwd: projectRoot, encoding: "utf8" },
    );

    if (licenseResult.status !== 0) {
      throw new Error(
        licenseResult.stderr || `zip exited with status ${licenseResult.status}`,
      );
    }

    await rename(temporaryArchive, finalArchive);
    archives.push(finalArchive);
    console.log(path.relative(root, finalArchive));
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

const checksums = [];

for (const archive of archives) {
  const digest = createHash("sha256")
    .update(await readFile(archive))
    .digest("hex");
  checksums.push(`${digest}  ${path.basename(archive)}`);
}

await writeFile(path.join(dist, "SHA256SUMS.txt"), `${checksums.join("\n")}\n`);
console.log(path.relative(root, path.join(dist, "SHA256SUMS.txt")));
