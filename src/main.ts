import * as path from "path";

import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

const ARCH = "x64";
const DUCIBLE = "ducible";
const DUCIBLE_VERSION = "1.2.2";

export function ducibleUrl(
  version: string = DUCIBLE_VERSION,
  arch: string = ARCH
): string {
  return `https://github.com/jasonwhite/ducible/releases/download/v${version}/ducible-windows-${arch}-Release.zip`;
}

async function run(): Promise<void> {
  try {
    // Attempt to find cached version of the tool
    const cacheDir = await tc.find(DUCIBLE, DUCIBLE_VERSION);

    // Add cached tool to path
    if (cacheDir) {
      core.debug(`Found ${DUCIBLE} v${DUCIBLE_VERSION} in cache ${cacheDir}`);

      const ducibleExe = path.join(cacheDir, "ducible.exe");
      await core.addPath(ducibleExe);

      return;
    }

    // Download fresh release zip
    const url: string = ducibleUrl();
    core.debug(`Downloading ${url} ...`);
    const downloadPath = await tc.downloadTool(url);
    core.debug(downloadPath);

    // Unzip the downloaded file
    const zipFolder = await tc.extractZip(downloadPath);
    core.debug(zipFolder);

    // Place tool in the cache
    const newCacheDir = await tc.cacheDir(zipFolder, DUCIBLE, DUCIBLE_VERSION);
    core.debug(newCacheDir);

    // Add tool to the path
    const ducibleExe = path.join(newCacheDir, "ducible.exe");
    await core.addPath(ducibleExe);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
