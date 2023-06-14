import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export const print = (...args: any[]) => {
  console.log(...args);
};

export const exec = (command: string, args: string[] = []) => {
  let result = '';
  let error: any = null;
  return new Promise<string>((resolve, reject) => {
    const p = spawn(command, args, { cwd: process.cwd(), shell: true });
    p.stdout.on('data', (data) => {
      result += data.toString();
    });
    p.on('error', (e) => {
      error = e;
    });
    p.on('close', (code: number) => {
      if (code !== 0) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

export const readPackage = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
};

export const savePackage = (pkg: Record<string, any>) => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
};

export const addToPackage = (key: string, value: any) => {
  const pkg = readPackage();
  Object.assign(pkg, { [key]: value });
  savePackage(pkg);
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
