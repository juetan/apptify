import fs from 'fs';
import { bold, green } from 'kolorist';
import path from 'path';
import { addToPackage, exec, installerOptions, print } from '../utils';
import inquirer from 'inquirer';
import { defineWorkflow } from '../utils/try-run';

export const installCommitlint = async (args: any) => {
  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请输入存放配置文件的目录',
      type: 'input',
      default: './scripts/husky',
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
      name: '安装 @commitlint/cli 和 @commitlint/config-conventional 依赖',
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
      name: '添加 commitlint 配置到 git commit-msg 钩子中',
      job: async () => {
        const fullPath = path.join(opts.dir, 'commit-msg');
        fs.writeFileSync(fullPath, `npx --no-install commitlint --edit $1`);
      },
    },
    {
      name: `安装 commitizen 和 cz-convetional-hangelog 依赖`,
      onBefore() {
        print();
      },
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
      name: `添加 commit 命令到 package.json 文件中`,
      async job() {
        await exec(`npm set-script commit "cz"`);
      },
    },
  ]);

  await workflow.run();

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令添加钩子:\n`);
};
