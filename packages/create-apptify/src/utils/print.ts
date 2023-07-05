import { blue, bold, gray, green } from 'kolorist';
import { LOGO } from './logo';
import { getCliDir } from './get-cli-dir';
import { readPackage } from './package';

export const print = (...args: any[]) => {
  console.log(...args);
};

export const printCmd = (cmd: string, tip?: string) => {
  if (tip) {
    print(gray(`# ${tip}`));
  }
  print(`${gray('$')} ${blue(cmd)}`);
};

export const printInstallSuccessuly = (msg?: string) => {
  print(`${bold(green(msg || '安装完成'))}! 接下来你可以参考以下内容进行操作:\n`);
};

export const printBanner = () => {
  const pkdPath = getCliDir();
  const pkg = readPackage(pkdPath);
  print(LOGO);
  print(`${'欢迎使用 Apptify CLI 工具'}! 版本: v${pkg.version}\n`);
};
