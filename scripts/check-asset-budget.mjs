import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const limits = {
  ".mp4": 10 * 1024 * 1024,
  ".webm": 10 * 1024 * 1024,
  ".webp": 1 * 1024 * 1024,
  ".avif": 1 * 1024 * 1024,
  ".png": 2 * 1024 * 1024,
  ".jpg": 2 * 1024 * 1024,
  ".jpeg": 2 * 1024 * 1024
};
const totalVideoLimit = 50 * 1024 * 1024;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else files.push(absolute);
  }

  return files;
}

const files = await walk(publicDirectory);
const violations = [];
let totalVideoBytes = 0;

for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  const fileStat = await stat(file);
  const relative = path.relative(root, file);

  if (extension === ".mp4" || extension === ".webm") {
    totalVideoBytes += fileStat.size;
  }

  const limit = limits[extension];
  if (limit && fileStat.size > limit) {
    violations.push(
      `${relative} is ${(fileStat.size / 1024 / 1024).toFixed(2)} MB; ` +
        `budget is ${(limit / 1024 / 1024).toFixed(0)} MB.`
    );
  }
}

if (totalVideoBytes > totalVideoLimit) {
  violations.push(
    `Total public video size is ${(totalVideoBytes / 1024 / 1024).toFixed(2)} MB; ` +
      `budget is ${(totalVideoLimit / 1024 / 1024).toFixed(0)} MB.`
  );
}

if (violations.length) {
  console.error("Asset budget failed:\n");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `Asset budget passed. Public videos total ${(totalVideoBytes / 1024 / 1024).toFixed(2)} MB.`
);
