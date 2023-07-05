import inquirer from 'inquirer';
import { bold, green } from 'kolorist';
import { addToPackage, defineWorkflow, exec, installerOptions, print, printCmd } from '../utils';

interface Options {
  gitHooksPath?: string;
  installer?: string;
  silent?: boolean;
}

export const installEslint = async (args: Options = {}) => {
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
  const options: Options = { ...args, ...answers };

  const workflow = defineWorkflow([
    {
      name: '安装 eslint 依赖',
      job: async () => {
        const inst = options.installer === 'yarn' ? 'add' : 'install';
        const cmd = `${options.installer} ${inst} -D eslint`;
        await exec(cmd);
      },
    },
    {
      name: `添加配置到 package.json 文件中`,
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
  print(`${bold(green('安装完成'))}! 接下来你可以参考以下内容进行操作:\n`);
  printCmd(`npx eslint ./test.js\n`, '检查文件');
  printCmd(`https://eslint.org/docs/latest/use/getting-started\n`, '官方文档');
};
