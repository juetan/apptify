import fs from 'fs';
import { bold, green } from 'kolorist';
import path from 'path';
import { defineWorkflow, exec, installerOptions, print } from '../utils';
import inquirer from 'inquirer';

export const installHusky = async (args: any) => {
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

  if (!fs.existsSync(path.join(process.cwd(), opts.dir))) {
    fs.mkdirSync(path.join(process.cwd(), opts.dir), { recursive: true });
  }

  const workflow = defineWorkflow([
    {
      name: '安装 husky 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D husky`;
        await exec(cmd);
      },
    },
    {
      name: `创建 ${opts.dir} 目录并设置 git config core.hooksPath 指向该目录`,
      job: async () => {
        await exec(`npx husky install "${opts.dir}"`);
      },
    },
    {
      name: '添加 prepare 钩子到 package.json 文件中',
      job: async () => {
        await exec(`npm set-script prepare "husky install ${opts.dir}"`);
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令添加钩子:\n`);
  print(`npx husky add scripts/husky/<pre-commit> "<钩子内容>"\n`);
};
