import { exec } from './exec';
import fs from 'fs';
import path from 'path';

export const getGitHooksDir = async () => {
  const dir = await exec('git config core.hooksPath');
  return dir;
};

export const isGitInstalled = async () => {
  try {
    await exec('git --version');
    return true;
  } catch (error) {
    return false;
  }
};

export const isGitRepository = async () => {
  try {
    await exec('git rev-parse --is-inside-work-tree');
    return true;
  } catch (error) {
    return false;
  }
};

export const isCurrentDirGitRepository = async () => {
  try {
    return fs.existsSync(path.join(process.cwd(), '.git'));
  } catch (error) {
    return false;
  }
};
