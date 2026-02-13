import { execSync } from 'child_process';
import fs from 'fs';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const commitDate = execSync('git log -1 --format=%cd --date=short').toString().trim();

const versionInfo = {
  commit: commitHash,
  date: commitDate
};

fs.writeFileSync(
  './src/version.json',
  JSON.stringify(versionInfo, null, 2)
);