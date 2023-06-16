import inquirer from 'inquirer';
import { bold, green } from 'kolorist';
import {
  addToPackage,
  defineWorkflow,
  exec,
  installerOptions,
  isCurrentDirGitRepository,
  isGitInstalled,
  print,
} from '../utils';
import fs from 'fs';
import path from 'path';

export const installLintStaged = async (args: any) => {
  if (!(await isGitInstalled())) {
    print(`\n抱歉, Git未安装, 可通过 https://git-scm.com/downloads 下载安装。\n`);
    return;
  }

  if (!(await isCurrentDirGitRepository())) {
    print(`\n抱歉, 当前目录不是Git仓库, 请先通过 git init 命令进行初始化。\n`);
    return;
  }

  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请输入存放配置的目录',
      type: 'input',
      default: './scripts/husky',
      when: () => !args.dir,
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: installerOptions,
      default: 'pnpm',
      when: () => !args.installer,
    },
  ]);
  const opts: { dir: string; installer: string } = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 lint-staged 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D lint-staged`;
        await exec(cmd);
      },
    },
    {
      name: `创建 lint-staged 配置到 package.json 文件中`,
      job: async () => {
        addToPackage('lint-staged', {});
      },
    },
    {
      name: '添加 lint-staged 命令到 git pre-commit 钩子中',
      job: async () => {
        const fullPath = path.join(opts.dir, 'commit-msg');
        fs.writeFileSync(fullPath, `npx --no-install commitlint --edit $1`);
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令测试:\n`);
  print(`npx lint-staged\n`);
};
