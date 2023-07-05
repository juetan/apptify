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
  printCmd,
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
      message: '请输入Git Hooks目录',
      type: 'input',
      default: '.husky',
      when: () => !args.dir,
    },
    {
      name: 'configPath',
      message: '请选择配置格式',
      type: 'list',
      default: '.husky',
      when: () => !args.configPath,
      choices: [
        {
          name: 'package.json',
          value: 'package.json',
        },
        {
          name: '.lintstagedrc.json',
          value: '.lintstagedrc.json',
        },
      ],
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
  const config: { dir: string; installer: string; configPath: string } = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 lint-staged 依赖',
      job: async () => {
        const inst = config.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${config.installer} ${inst} -D lint-staged`;
        await exec(cmd);
      },
    },
    {
      name: `添加配置到 package.json 文件中`,
      job: async () => {
        addToPackage('lint-staged', {});
      },
    },
    {
      name: '添加命令到 git pre-commit 钩子中',
      job: async () => {
        const hookPath = path.join(config.dir, 'commit-msg');
        fs.writeFileSync(hookPath, `npx --no-install commitlint --edit $1`);
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('安装完成'))}! 接下来你可以参考以下内容进行操作:\n`);
  printCmd(`vim ${config.configPath}\n`, '添加命令');
  printCmd(`npx lint-staged\n`, '手动执行');
  printCmd(`https://github.com/okonet/lint-staged\n`, '官方文档');
};
