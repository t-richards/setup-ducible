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
    // Attempt to find cached version of the tool; add it to the path
    let cacheDir = tc.find(DUCIBLE, DUCIBLE_VERSION);
    if (cacheDir) {
      return core.addPath(cacheDir);
    }

    // Download fresh release; unzip it
    const downloadPath = await tc.downloadTool(ducibleUrl());
    const zipFolder = await tc.extractZip(downloadPath);

    // Cache unzipped folder; add newly cached tool to the path
    cacheDir = await tc.cacheDir(zipFolder, DUCIBLE, DUCIBLE_VERSION);
    return core.addPath(cacheDir);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
