import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const MB = 1024 * 1024;

const imageLimits = {
  ".webp": 1 * MB,
  ".avif": 1 * MB,
  ".png": 2 * MB,
  ".jpg": 2 * MB,
  ".jpeg": 2 * MB
};

const workVideoLimit = 20 * MB;
const caseStudyVideoLimit = 45 * MB;
const homepageVideoLimit = 90 * MB;
const caseStudyGroupLimit = 80 * MB;

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

function toMb(bytes) {
  return `${(bytes / MB).toFixed(2)} MB`;
}

const files = await walk(publicDirectory);
const violations = [];
const caseStudyTotals = new Map();
let homepageVideoBytes = 0;
let totalVideoBytes = 0;

for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  const fileStat = await stat(file);
  const relative = path.relative(root, file).split(path.sep).join("/");

  if (extension === ".mp4" || extension === ".webm") {
    totalVideoBytes += fileStat.size;

    const isCaseStudy = relative.startsWith("public/videos/case-studies/");
    const limit = isCaseStudy ? caseStudyVideoLimit : workVideoLimit;

    if (fileStat.size > limit) {
      violations.push(`${relative} is ${toMb(fileStat.size)}; budget is ${toMb(limit)}.`);
    }

    if (relative.startsWith("public/videos/work/")) {
      homepageVideoBytes += fileStat.size;
    }

    if (isCaseStudy) {
      const parts = relative.split("/");
      const project = parts[3] ?? "unknown";
      caseStudyTotals.set(project, (caseStudyTotals.get(project) ?? 0) + fileStat.size);
    }

    continue;
  }

  const imageLimit = imageLimits[extension];
  if (imageLimit && fileStat.size > imageLimit) {
    violations.push(
      `${relative} is ${toMb(fileStat.size)}; budget is ${toMb(imageLimit)}.`
    );
  }
}

if (homepageVideoBytes > homepageVideoLimit) {
  violations.push(
    `Homepage work videos total ${toMb(homepageVideoBytes)}; budget is ${toMb(homepageVideoLimit)}.`
  );
}

for (const [project, bytes] of caseStudyTotals) {
  if (bytes > caseStudyGroupLimit) {
    violations.push(
      `Case study ${project} videos total ${toMb(bytes)}; budget is ${toMb(caseStudyGroupLimit)}.`
    );
  }
}

if (violations.length) {
  console.error("Asset budget failed:\n");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `Asset budget passed. Homepage videos ${toMb(homepageVideoBytes)}. ` +
    `Total video library ${toMb(totalVideoBytes)}. ` +
    `Case-study groups checked ${caseStudyTotals.size}.`
);
