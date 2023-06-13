import { spawn } from 'child_process';

export const exec = (command: string, args: string[] = []) => {
  return new Promise<void>((resolve, reject) => {
    const p = spawn(command, args, { stdio: 'inherit', cwd: process.cwd(), shell: true });
    p.on('close', (code: number) => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`);
        return;
      }
      resolve();
    });
  });
};
