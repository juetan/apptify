import { SpawnOptions, spawn } from 'child_process';

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

export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object';

export const assign = (target: Record<string, any>, ...sources: Record<string, any>[]) => {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      if (isObject(target[key]) && isObject(source[key])) {
        assign(target[key], source[key]);
        return;
      }
      if (Array.isArray(target[key]) && Array.isArray(source[key])) {
        target[key] = [...target[key], ...source[key]];
        return;
      }
      target[key] = source[key];
    });
  });
  return target;
};
