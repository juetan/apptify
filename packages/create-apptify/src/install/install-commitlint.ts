import fs from 'fs';
import path from 'path';
import { addToPackage, exec, installerOptions, printCmd, printInstallSuccessuly } from '../utils';
import inquirer from 'inquirer';
import { defineWorkflow } from '../utils/workflow';

export const installCommitlint = async (args: any) => {
  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请输入 Git hooksPath 目录',
      type: 'input',
      default: './husky',
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      default: 'pnpm',
      choices: installerOptions,
    },
  ]);
  const opts: { dir: string; installer: string } = { ...args, ...answers };

  if (!fs.existsSync(path.join(process.cwd(), opts.dir))) {
    fs.mkdirSync(path.join(process.cwd(), opts.dir), { recursive: true });
  }

  const workflow = defineWorkflow([
    {
      name: '安装依赖: @commitlint/cli @commitlint/config-conventional',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D @commitlint/cli @commitlint/config-conventional`;
        await exec(cmd);
      },
    },
    {
      name: '添加 commitlint 配置到 package.json 文件中',
      job: async () => {
        addToPackage('commitlint', { extends: ['@commitlint/config-conventional'] });
      },
    },
    {
      name: '添加 commitlint 命令到 git commit-msg 钩子中',
      job: async () => {
        const hookPath = path.join(opts.dir, 'commit-msg');
        fs.writeFileSync(hookPath, `npx --no-install commitlint --edit $1`);
      },
    },
    {
      name: `安装依赖: commitizen cz-convetional-hangelog`,
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D commitizen cz-conventional-changelog`;
        await exec(cmd);
      },
    },
    {
      name: `添加 commitizen 配置到 package.json 文件中`,
      job: async () => {
        addToPackage('config', { commitizen: { path: 'cz-conventional-changelog' } });
      },
    },
    {
      name: `添加 commitizen 命令到 package.json 文件中`,
      async job() {
        await exec(`npm set-script commit "cz"`);
      },
    },
  ]);
  await workflow.run();

  printInstallSuccessuly();
  printCmd(`https://github.com/conventional-changelog/commitlint\n`, '官方文档');
  printCmd(`https://github.com/commitizen/cz-cli\n`, '官方文档');
};
