/**
 * Deterministic macOS CI test shards
 * Zones: CI, test execution
 * Keeps real-process tests isolated and partitions the remaining files without changing test deadlines.
 */
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";

const [shard, phase, mode, ...extra] = process.argv.slice(2);
if (!["0", "1"].includes(shard) || !["process", "remaining"].includes(phase) ||
    (mode !== undefined && mode !== "--list") || extra.length) {
  throw new Error("Usage: run-macos-tests.mjs <0|1> <process|remaining> [--list]");
}
const root = fileURLToPath(new URL("..", import.meta.url));
const entries = readdirSync(join(root, "tests"), { withFileTypes: true })
  .filter((entry) => entry.name.endsWith(".test.ts"));
if (entries.some((entry) => !entry.isFile()))
  throw new Error("The CI test inventory must contain only regular test files.");
const names = entries.map((entry) => entry.name).sort();
const processTest = "process-shutdown.test.ts";
if (!names.includes(processTest)) throw new Error("The real-process test suite is missing.");
const files = (phase === "process"
  ? (shard === "0" ? [processTest] : [])
  : names.filter((name) => name !== processTest).filter((_, index) => index % 2 === Number(shard)))
  .map((name) => `tests/${name}`);
if (mode === "--list") {
  console.log(JSON.stringify(files));
} else if (files.length) {
  console.log(`macOS shard ${Number(shard) + 1}/2 ${phase}: ${files.length} test file(s)`);
  const result = spawnSync(process.execPath, [
    "--experimental-strip-types", "--import", "./tests/fixtures/canonical-tmpdir.ts",
    "--test", "--test-concurrency=1", `--test-reporter=${phase === "process" ? "spec" : "dot"}`,
    ...files,
  ], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PATH: [join(root, "node_modules", ".bin"), process.env.PATH].filter(Boolean).join(delimiter) },
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
