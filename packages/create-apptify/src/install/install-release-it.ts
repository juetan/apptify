import fs from 'fs';
import path from 'path';
import { defineWorkflow, exec } from '../utils';
import inquirer from 'inquirer';

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
      name: '安装 release-it 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D release-it @release-it/conventional-changelog`;
        await exec(cmd);
      },
    },
    {
      name: '复制 配置文件 到 scripts/release-it 目录下',
      job: async () => {
        const from = path.join(opts.dir, '../files/release-it');
        const to = path.join(process.cwd(), opts.dir);
        fs.cpSync(from, to, { recursive: true });
      },
    },
    {
      name: '添加 release 命令到 package.json 文件中',
      job: async () => {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts.release = `release-it --config ${opts.dir}/release-it.cjs`;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      },
    },
  ]);
  await workflow.run();
};
