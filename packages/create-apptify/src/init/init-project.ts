import { green, gray, blue } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { addToPackage, exec, installerOptions, print, saveGithubRepoTo } from '../utils';
import inquirer from 'inquirer';

const repoMap: Record<string, any> = {
  vueAdmin: 'juetan/apptify-admin',
  nest: 'juetan/apptify-admin',
  tampermonkey: 'juetan/apptify-admin',
};

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
          value: 'vueAdmin',
          name: '[vue-admin   ] - B端后台管理系统起始模板',
        },
        {
          value: 'nest',
          name: '[nest-admin  ] - NodeJS后端项目起始模板',
        },
        {
          value: 'tampermonkey',
          name: '[tampermonkey] - 开发油猴插件的起始模板',
        },
      ],
      when: () => !args.type,
    },
    {
      name: 'install',
      message: '是否自动安装依赖',
      type: 'confirm',
      default: true,
    },
    {
      name: 'installer',
      message: '请选择包管理器',
      type: 'list',
      choices: installerOptions,
      when: (answers: any) => answers.install,
    },
  ]);
  const opts = { ...args, ...answers } as any;
  const isCurrentDir = opts.path === '.' || opts.path === './';
  const repoUrl = repoMap[opts.type];

  const spinner = ora(`[1] 下载模板到 ${opts.path} 目录中`);
  try {
    print();
    spinner.start();
    const start = Date.now();
    await saveGithubRepoTo(repoUrl, opts.path);
    const time = ((Date.now() - start) / 1000).toFixed(2);
    spinner.succeed(`[1] 下载模板到 ${opts.path} 目录中(用时: ${green(time)} 秒)`);
  } catch (error) {
    spinner.fail();
    return print(error);
  }

  const spinner2 = ora(`[2] 设置 ${opts.path} 目录中的 package.json 信息`);
  try {
    spinner2.start();
    const start = Date.now();
    const options = { dir: path.join(process.cwd(), opts.path) };
    addToPackage('name', opts.name, options);
    addToPackage('description', opts.description, options);
    const time = ((Date.now() - start) / 1000).toFixed(2);
    spinner2.succeed(`[2] 设置 ${opts.path} 目录中的 package.json 信息1(用时: ${green(time)} 秒)`);
  } catch (error) {
    spinner2.fail();
    return print(error);
  }

  if (opts.install && opts.installer) {
    const text = `[3] 安装依赖中, 时间可能较长请耐心等待`;
    const spinner3 = ora(text);
    try {
      spinner3.start();
      const installName = opts.installer === 'yarn' ? '' : 'install';
      const start = Date.now();
      await exec(`cd ${opts.path} && ${opts.installer} ${installName}`);
      const time = ((Date.now() - start) / 1000).toFixed(2);
      spinner3.succeed(`${text}(用时: ${green(time)} 秒)`);
    } catch (error) {
      spinner3.fail();
      return print(error);
    }
  }

  print();
  print(`${green('初始化完成!')} 接下来你可以参照以下命令进行开发:\n`);
  !isCurrentDir && print(gray('# 进入项目'));
  !isCurrentDir && print(`${gray('$')} ${blue(`cd ${opts.path}`)}\n`);
  !opts.install && print(gray('# 安装依赖'));
  !opts.install && print(`${gray('$')} ${blue(`npm install`)}\n`);
  print(gray('# 启动项目'));
  print(`${gray('$')} ${blue(`${opts.installer || 'npm'} run dev`)}\n`);
};
