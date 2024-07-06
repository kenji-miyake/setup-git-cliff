import { promises as fsPromises } from "fs";
import * as path from "path";

import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import { Octokit } from "@octokit/rest";

async function main() {
  const octokit = new Octokit({ auth: core.getInput("token") });

  let version = core.getInput("version");
  if (version === "latest") {
    const latestRelease = await octokit.repos.getLatestRelease({
      owner: "orhun",
      repo: "git-cliff",
    });
    version = latestRelease.data.tag_name.replace("v", "");
  }

  const targetPlatform = core.getInput("target-platform");
  const archiveExtension = core.getInput("archive-extension");

  let cachedPath = tc.find("git-cliff", version);
  if (!cachedPath) {
    const url = `https://github.com/orhun/git-cliff/releases/download/v${version}/git-cliff-${version}-${targetPlatform}.${archiveExtension}`;
    core.info(`Downloading ${url}`);
    let archivePath = await tc.downloadTool(url);
    await fsPromises.rename(archivePath, archivePath + "." + archiveExtension);
    archivePath += "." + archiveExtension;
    const extractionFunction = archiveExtension === "tar.gz" ? tc.extractTar : tc.extractZip;
    core.info(`Extracting ${archivePath} with ${extractionFunction.name}`);
    const extractedFolder = await extractionFunction(archivePath, "/tmp/git-cliff");
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
