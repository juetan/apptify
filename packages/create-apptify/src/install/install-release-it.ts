import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import {
  addToPackage,
  defineWorkflow,
  exec,
  getCliDir,
  installerOptions,
  printCmd,
  printInstallSuccessuly,
} from '../utils';

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
      choices: installerOptions,
      default: 'pnpm',
    },
  ]);
  const opts: { dir: string; installer: string } = { ...args, ...answers };

  if (!fs.existsSync(path.join(process.cwd(), opts.dir))) {
    fs.mkdirSync(path.join(process.cwd(), opts.dir), { recursive: true });
  }

  const workflow = defineWorkflow([
    {
      name: '安装依赖: release-it @release-it/conventional-changelog',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D release-it @release-it/conventional-changelog`;
        await exec(cmd);
      },
    },
    {
      name: `复制模板和配置文件到 ${opts.dir} 目录下`,
      job: async () => {
        const from = path.join(getCliDir(), './files/release-it');
        const to = path.join(process.cwd(), opts.dir);
        fs.cpSync(from, to, { recursive: true });
      },
    },
    {
      name: '添加命令到 package.json 文件中',
      job: async () => {
        addToPackage('scripts', { release: `release-it --config ${opts.dir}/release-it.cjs` });
      },
    },
  ]);
  await workflow.run();

  printInstallSuccessuly();
  printCmd(`npm run release\n`, '发布新版本');
  printCmd(`https://github.com/release-it/release-it\n`, '官方文档');
};
