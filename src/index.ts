import * as os from "os";
import * as path from "path";

import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

async function main() {
  const version = core.getInput("version");
  const targetPlatform = core.getInput("target-platform");

  let cachedPath = tc.find("git-cliff", version);
  if (!cachedPath) {
    const url = `https://github.com/orhun/git-cliff/releases/download/v${version}/git-cliff-${version}-${targetPlatform}.tar.gz`;
    const tarPath = await tc.downloadTool(url);
    const extractedFolder = await tc.extractTar(tarPath, "git-cliff");
    const binFolder = path.join(extractedFolder, `git-cliff-${version}`);
    cachedPath = await tc.cacheDir(binFolder, "git-cliff", version);
  }
  core.addPath(cachedPath);
}

try {
  main();
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  }
}
