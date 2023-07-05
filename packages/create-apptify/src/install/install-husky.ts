import inquirer from 'inquirer';
import { bold, green } from 'kolorist';
import {
  defineWorkflow,
  exec,
  installerOptions,
  isCurrentDirGitRepository,
  isGitInstalled,
  print,
  printCmd,
} from '../utils';
import { existsSync } from 'fs';
import { join } from 'path';

interface Options {
  dir?: string;
  installer?: string;
  silent?: boolean;
}

export const installHusky = async (args: Options = {}) => {
  if (!existsSync(join(process.cwd(), 'package.json'))) {
    throw Error(`当前目录下不存在 package.json 文件, 请先通过 npm init 命令进行初始化。`);
  }
  if (!(await isGitInstalled())) {
    throw Error(`Git未安装, 可通过 https://git-scm.com/downloads 下载安装`);
  }
  if (!(await isCurrentDirGitRepository())) {
    throw Error(`当前目录不是Git仓库, 请先通过 git init 命令进行初始化。`);
  }

  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请输入配置目录',
      type: 'input',
      default: '.husky',
      when: () => !args?.dir,
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: installerOptions,
      default: 'pnpm',
      when: () => !args?.installer,
    },
  ]);
  const config: Options = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 husky 依赖',
      job: async () => {
        const inst = config.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${config.installer} ${inst} -D husky`;
        await exec(cmd);
      },
    },
    {
      name: `创建 ${config.dir} 目录, 设置 git config core.hooksPath 指向该目录`,
      job: async () => {
        await exec(`npx husky install "${config.dir}"`);
      },
    },
    {
      name: '添加 prepare 钩子到 package.json 文件中',
      job: async () => {
        await exec(`npm set-script prepare "husky install ${config.dir}"`);
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('安装完成'))}! 接下来你可以参考以下内容进行操作:\n`);
  printCmd(`npx husky add ${config.dir}/<hook-name> "<hook-content>"\n`, '添加钩子');
  printCmd(`git config --unset core.hooksPath\n`, '重置钩子目录');
  printCmd(`https://typicode.github.io/husky/\n`, '官方文档');
};
