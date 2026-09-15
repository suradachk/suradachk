import { readFile, writeFile } from "node:fs/promises";

const readmePath = new URL("../README.md", import.meta.url);
const careerStart = new Date(Date.UTC(2020, 3, 1));
const today = new Date();

const totalMonths =
  (today.getUTCFullYear() - careerStart.getUTCFullYear()) * 12 +
  today.getUTCMonth() -
  careerStart.getUTCMonth() -
  (today.getUTCDate() < careerStart.getUTCDate() ? 1 : 0);

if (totalMonths < 0) {
  throw new Error("Career start date cannot be in the future.");
}

const years = Math.floor(totalMonths / 12);
const months = totalMonths % 12;
const parts = [
  `${years} ${years === 1 ? "year" : "years"}`,
  ...(months > 0 ? [`${months} ${months === 1 ? "month" : "months"}`] : []),
];
const experience = parts.join(" ");

const startMarker = "<!-- EXPERIENCE:START -->";
const endMarker = "<!-- EXPERIENCE:END -->";
const readme = await readFile(readmePath, "utf8");
const markerPattern = /<!-- EXPERIENCE:START -->[\s\S]*?<!-- EXPERIENCE:END -->/;

if (!markerPattern.test(readme)) {
  throw new Error("Experience markers were not found in README.md.");
}

const updatedReadme = readme.replace(
  markerPattern,
  `${startMarker}${experience}${endMarker}`,
);

if (updatedReadme !== readme) {
  await writeFile(readmePath, updatedReadme, "utf8");
  console.log(`Updated experience to ${experience}.`);
} else {
  console.log(`Experience is already current: ${experience}.`);
}
