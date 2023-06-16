import inquirer from 'inquirer';
import { bold, green, gray, blue } from 'kolorist';
import { addToPackage, defineWorkflow, exec, installerOptions, print } from '../utils';

export const installEslint = async (args: { gitHooksPath?: string; installer?: string; silent?: boolean } = {}) => {
  const answers = await inquirer.prompt([
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: installerOptions,
      default: 'pnpm',
      when: () => !args.installer,
    },
  ]);
  const opts: { gitHooksPath: string; installer: string } = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 eslint 依赖',
      job: async () => {
        const inst = opts.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${opts.installer} ${inst} -D eslint`;
        await exec(cmd);
      },
    },
    {
      name: `添加 eslint 配置到 package.json 文件中`,
      job: async () => {
        const config = {
          env: {
            browser: true,
            es2021: true,
          },
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
          },
        };
        addToPackage('eslintConfig', config);
      },
    },
  ]);
  await workflow.run({ silent: args.silent });

  if (args.silent) {
    return;
  }
  print(`${bold(green('安装完成'))}! 接下来你可以通过以下命令测试:\n`);
  print(gray('# 检查特定文件'));
  print(`${gray('$')} ${blue(`npx eslint ./test.js`)}\n`);
};
