import * as cp from "child_process";
import * as path from "path";
import * as process from "process";

test("run built action with env/stdout protocol", () => {
  process.env["RUNNER_TOOL_CACHE"] = "/tmp/setup-ducible/cache";
  process.env["RUNNER_TEMP"] = "/tmp/setup-ducible";
  process.env["INPUT_VERSION"] = "1.2.2";
  process.env["INPUT_ARCH"] = "x64";

  const nodePath = process.execPath;
  const inputPath = path.join(__dirname, "..", "lib", "main.js");
  const options: cp.ExecFileSyncOptions = { env: process.env };

  console.log(cp.execFileSync(nodePath, [inputPath], options).toString());
});
