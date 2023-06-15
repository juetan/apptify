import inquirer from 'inquirer';
import { bold, green } from 'kolorist';
import { addToPackage, assign, defineWorkflow, exec, installerOptions, print, readPackage } from '../utils';

export const installPrettier = async (args: any) => {
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
      name: '安装 prettier、eslint-config-prettier 和 eslint-plugin-prettier 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D prettier eslint-config-prettier eslint-plugin-prettier`;
        await exec(cmd);
      },
    },
    {
      name: `添加 prettier 配置到 package.json 文件中`,
      job: async () => {
        addToPackage('prettier', { printWidth: 120, singleQuote: true, crlf: 'auto' });
      },
    },
    {
      name: '作为插件添加 eslint 配置中',
      job: async () => {
        const pkg = readPackage();
        assign(pkg, { eslintConfig: { extends: ['plugin:prettier/recommended'] } });
        addToPackage('eslintConfig', pkg);
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令:\n`);
  print(`npx prettier .\n`);
};
