import { SpawnOptions, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export const print = (...args: any[]) => {
  console.log(...args);
};

export const exec = (command: string, args: string[] = [], options: SpawnOptions = {}) => {
  let result = '';
  let error = '';
  return new Promise<string>((resolve, reject) => {
    const p = spawn(command, args, { cwd: process.cwd(), shell: true, ...options });
    p.stdout?.on('data', (data) => {
      result += data.toString();
    });
    p.stderr?.on('data', (data) => {
      error += data.toString('utf-8');
    });
    p.on('close', (code: number) => (code === 0 ? resolve(result) : reject(error)));
  });
};

export const getGitHooksDir = async () => {
  const dir = exec('git config core.hooksPath');
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

export const readPackage = (dir: string = process.cwd()) => {
  const packageJsonPath = path.join(dir, 'package.json');
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
};

export const savePackage = (pkg: Record<string, any>, dir: string = process.cwd()) => {
  const packageJsonPath = path.join(dir, 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
};

export const addToPackage = (key: string, value: any, opts?: { dir?: string }) => {
  const pkg = readPackage(opts?.dir);
  Object.assign(pkg, { [key]: value });
  savePackage(pkg, opts?.dir);
};

export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object';

export const assign = (target: Record<string, any>, ...sources: Record<string, any>[]) => {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      if (isObject(target[key]) && isObject(source[key])) {
        assign(target[key], source[key]);
        return;
      }
      target[key] = source[key];
    });
  });
  return target;
};
