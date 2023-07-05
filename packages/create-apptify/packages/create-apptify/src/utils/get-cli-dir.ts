import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.join(fileURLToPath(import.meta.url), '..');

export const getCliDir = (dir = __dirname): string => {
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir;
  }
  return getCliDir(path.join(dir, '..'));
};
