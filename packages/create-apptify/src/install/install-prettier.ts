import inquirer from 'inquirer';
import {
  addToPackage,
  assign,
  defineWorkflow,
  exec,
  installerOptions,
  printCmd,
  printInstallSuccessuly,
  readPackage,
} from '../utils';

export const installPrettier = async (args: any) => {
  const answers = await inquirer.prompt([
    {
      name: 'dir',
      message: '请输入存放配置的目录',
      type: 'input',
      default: './husky',
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
  const config: { dir: string; installer: string } = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 prettier eslint-config-prettier 和 eslint-plugin-prettier 依赖',
      job: async () => {
        const inst = config.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${config.installer} ${inst} -D prettier eslint-config-prettier eslint-plugin-prettier`;
        await exec(cmd);
      },
    },
    {
      name: `添加配置到 package.json 文件中`,
      job: async () => {
        addToPackage('prettier', { printWidth: 120, singleQuote: true, crlf: 'auto' });
      },
    },
    {
      name: '作为插件添加到 eslint 配置中',
      job: async () => {
        const pkg = readPackage();
        assign(pkg, { eslintConfig: { extends: ['plugin:prettier/recommended'] } });
        addToPackage('eslintConfig', pkg);
      },
    },
  ]);
  await workflow.run();

  printInstallSuccessuly();
  printCmd(`npx prettier .\n`, '手动运行');
  printCmd(`https://prettier.io/docs/en/index.html\n`, '官方文档');
};
