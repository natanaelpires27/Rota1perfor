import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { spawnSync } from "node:child_process";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
  "vercel.json",
];

const publicFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "site.webmanifest",
  "robots.txt",
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  throw new Error(`Arquivos obrigatorios ausentes: ${missing.join(", ")}`);
}

const syntax = spawnSync(process.execPath, ["--check", "app.js"], {
  encoding: "utf8",
});
if (syntax.status !== 0) {
  process.stderr.write(syntax.stderr || syntax.stdout);
  process.exit(syntax.status ?? 1);
}

const productionFiles = ["index.html", "styles.css", "app.js"];
const forbiddenPatterns = [
  /debugger\b/,
  /console\.log\s*\(/,
  /TODO\b/,
  /http:\/\/127\.0\.0\.1/,
  /http:\/\/localhost/,
  /file:\/\//,
];

const violations = [];
for (const file of productionFiles) {
  const content = readFileSync(file, "utf8");
  forbiddenPatterns.forEach((pattern) => {
    if (pattern.test(content)) {
      violations.push(`${file}: ${pattern}`);
    }
  });
}

if (violations.length) {
  throw new Error(`Padroes bloqueados encontrados:\n${violations.join("\n")}`);
}

rmSync("public", { recursive: true, force: true });
mkdirSync("public", { recursive: true });
publicFiles.forEach((file) => copyFileSync(file, `public/${file}`));

console.log("Validacao estatica concluida.");
