import * as cp from "child_process";
import * as path from "path";
import * as process from "process";

test("run built action with env/stdout protocol", () => {
  process.env["INPUT_VERSION"] = "1.2.2";
  process.env["INPUT_ARCH"] = "x64";

  const inputPath = path.join(__dirname, "..", "lib", "main.js");
  const options: cp.ExecSyncOptions = { env: process.env };

  console.log(cp.execSync(`node ${inputPath}`, options).toString());
});
