import inquirer from 'inquirer';
import { bold, green } from 'kolorist';
import { addToPackage, defineWorkflow, exec, installerOptions, print } from '../utils';

export const installEslint = async (args: any) => {
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
        addToPackage('eslintConfig', {});
      },
    },
  ]);
  await workflow.run();

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令添加钩子:\n`);
  print(`npx husky add scripts/husky/<pre-commit> "<钩子内容>"\n`);
};
