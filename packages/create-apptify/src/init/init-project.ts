import path from 'path';
import {
  addToPackage,
  defineWorkflow,
  exec,
  installerOptions,
  printCmd,
  printInstallSuccessuly,
  saveGithubRepoTo,
} from '../utils';
import inquirer from 'inquirer';

export const initProject = async (args: any) => {
  const answers = await inquirer.prompt<any>([
    {
      name: 'path',
      message: '请输入项目路径',
      type: 'input',
      default: './my-app',
      when: () => !args.path,
    },
    {
      name: 'name',
      message: '请输入项目名称',
      type: 'input',
      default: 'my-app',
      when: () => !args.name,
    },
    {
      name: 'description',
      message: '请输入项目描述',
      type: 'input',
      default: 'A project created by apptify-cli',
      when: () => !args.description,
    },
    {
      name: 'type',
      message: '请选择项目类型',
      type: 'list',
      choices: [
        {
          value: 'juetan/apptify-admin',
          short: 'vue-admin',
          name: '[vue-admin   ] - B端后台管理系统起始模板',
        },
        {
          value: 'juetan/apptify-admin',
          short: 'nest-admin',
          name: '[nest-admin  ] - NodeJS后端项目起始模板',
        },
        {
          value: 'juetan/apptify-admin',
          short: 'tampermonkey',
          name: '[tampermonkey] - 开发油猴插件的起始模板',
        },
      ],
      when: () => !args.type,
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: installerOptions,
      when: () => !args.installer,
    },
  ]);
  const options = { ...args, ...answers } as any;
  const isCurrentDir = options.path === '.' || options.path === './';

  const workflow = defineWorkflow([
    {
      name: `下载模板到 ${isCurrentDir ? '当前' : options.path} 目录中`,
      async job() {
        await saveGithubRepoTo(options.type, options.path);
      },
    },
    {
      name: `保存配置到 package.json 文件中`,
      async job() {
        const opts = { dir: path.join(process.cwd(), options.path) };
        addToPackage('name', options.name, opts);
        addToPackage('description', options.description, opts);
      },
    },
    {
      name: `安装依赖中, 时间可能较长请耐心等待`,
      skip: () => !options.installer,
      async job() {
        const installName = options.installer === 'yarn' ? '' : 'install';
        await exec(`cd ${options.path} && ${options.installer} ${installName}`);
      },
    },
  ]);
  await workflow.run();

  printInstallSuccessuly();
  !isCurrentDir && printCmd(`cd ${options.path}\n`, '进入项目目录');
  options.installer === 'none' && printCmd(`npm install\n`, '安装依赖');
  printCmd(`${options.installer || 'npm'} run dev\n`, '启动项目');
};
