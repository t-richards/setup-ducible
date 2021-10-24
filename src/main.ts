import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

type NodeArch = "x32" | "x64";
type DucibleArch = "Win32" | "x64";

const ARCH_MAP: Record<NodeArch, DucibleArch> = {
  x32: "Win32",
  x64: "x64",
};
const DUCIBLE = "ducible";

export function ducibleUrl(version: string, arch: NodeArch): string {
  const downloadArch = ARCH_MAP[arch];
  return `https://github.com/jasonwhite/ducible/releases/download/v${version}/ducible-windows-${downloadArch}-Release.zip`;
}

export async function setupDucible(
  version: string,
  arch: NodeArch
): Promise<void> {
  // Attempt to find cached version of the tool; add it to the path
  let cacheDir = tc.find(DUCIBLE, version, arch);
  if (cacheDir) {
    return core.addPath(cacheDir);
  }

  // Download fresh release; unzip it
  const url = ducibleUrl(version, arch);
  const downloadPath = await tc.downloadTool(url);
  const zipFolder = await tc.extractZip(downloadPath);

  // Cache unzipped folder; add newly cached tool to the path
  cacheDir = await tc.cacheDir(zipFolder, DUCIBLE, version, arch);
  return core.addPath(cacheDir);
}

async function run(): Promise<void> {
  try {
    const version = core.getInput("version");
    const arch = core.getInput("arch") as NodeArch;

    await setupDucible(version, arch);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
