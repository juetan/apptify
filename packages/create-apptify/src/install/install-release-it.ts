import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { addToPackage, defineWorkflow, exec, getCliDir } from '../utils';

export const installReleaseIt = async (args: any) => {
  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请选择配置文件的放置目录',
      type: 'input',
      default: './scripts/release-it',
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'pnpm',
    },
  ]);
  const opts: { dir: string; installer: string } = { ...args, ...answers };

  if (!fs.existsSync(path.join(process.cwd(), opts.dir))) {
    fs.mkdirSync(path.join(process.cwd(), opts.dir), { recursive: true });
  }

  const workflow = defineWorkflow([
    {
      name: '安装 release-it 和 @release-it/conventional-changelog 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D release-it @release-it/conventional-changelog`;
        await exec(cmd);
      },
    },
    {
      name: `复制 配置文件 到 ${opts.dir} 目录下`,
      job: async () => {
        const from = path.join(getCliDir(), './files/release-it');
        const to = path.join(process.cwd(), opts.dir);
        fs.cpSync(from, to, { recursive: true });
      },
    },
    {
      name: '添加 release 命令到 package.json 文件中',
      job: async () => {
        addToPackage('scripts', { release: `release-it --config ${opts.dir}/release-it.cjs` });
      },
    },
  ]);
  await workflow.run();
};
