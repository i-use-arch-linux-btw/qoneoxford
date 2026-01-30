#!/usr/bin/env node
/**
 * Run before pushing to confirm local env is for localhost only.
 * Fails if .env.local has production or staging (those belong on Vercel only).
 * Usage: node scripts/check-dev-before-push.js
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env.local");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  const out = {};
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) out[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = parseEnvFile(envPath);
const appEnv = env.NEXT_PUBLIC_APP_ENV ?? "development";

const allowedLocal = ["development"];
if (!allowedLocal.includes(appEnv)) {
  console.error(
    "check-dev-before-push: .env.local has NEXT_PUBLIC_APP_ENV=%s. For localhost use development only (staging/production are for deployed builds).",
    appEnv
  );
  process.exit(1);
}

console.log("check-dev-before-push: OK (NEXT_PUBLIC_APP_ENV=%s)", appEnv);
