import path from 'path';
import fs from 'fs';

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
