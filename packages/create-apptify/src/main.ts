import { program } from 'commander';
import Enquirer from 'enquirer';
import { bold, green, red } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';
import { installCommitlint } from './install/install-commitlint';
import { installHusky } from './install/install-husky';
import { installReleaseIt } from './install/install-release-it';
import { LOGO, print } from './utils';

const __dirname = path.join(fileURLToPath(import.meta.url), '..');

print(LOGO);

program
  .command('install <name>')
  .alias('i')
  .description('安装依赖并进行初始化操作')
  .option('--installer', '指定包管理器, 默认为pnpm', 'pnpm')
  .action(async (name: string, options: Record<string, any>) => {
    if (name === 'release-it') {
      print(bold(`安装: release-it\n`));
      installReleaseIt({ ...options, workDir: __dirname });
    } else if (name === 'husky') {
      print(bold(`安装: husky\n`));
      installHusky();
    } else if (name === 'commitlint') {
      print(bold(`安装: commitlint 和 commitizen\n`));
      installCommitlint();
    } else {
      print(`${red('x')} ${`抱歉，暂不支持该库的安装。当前支持的库有:\n`}`);
      print(`  [ husky      ]: git 钩子管理工具`);
      print(`  [ commitlint ]: git 提交信息校验工具`);
      print(`  [ release-it ]: git 版本发布工具`);
      print(`  [ prettier   ]: 代码格式化工具`);
      print(`  [ eslint     ]: 代码检查工具`);
      print(`  [ stylelint  ]: 样式检查工具`);
      print();
    }
  });

program
  .command('init <name>')
  .description('初始化项目')
  .action(async (name: string) => {
    print(bold(`初始化项目: ${name}\n`));

    const options = await Enquirer.prompt<any>([
      {
        name: 'type',
        message: '请选择项目类型',
        type: 'select',
        choices: [
          {
            name: 'vue-admin',
            hint: '基于 vue 的后台管理系统起始模板',
          },
          {
            name: 'nest     ',
            hint: '基于 nest 的后端项目起始模板',
          },
        ],
      },
      {
        name: 'projectName',
        message: '请输入项目名称',
        type: 'input',
        initial: 'my-app',
      },
    ]);
    print();

    const spinner = ora(`[1] 下载 ${options.type} 模板`);
    try {
      spinner.start();
      await new Promise((res) => setTimeout(res, 2000));
      spinner.succeed();
    } catch (error) {
      spinner.fail();
      return print(error);
    }

    const spinner2 = ora(`[2] 移动模板文件到 ${options.projectName} 目录下`);
    try {
      spinner2.start();
      await new Promise((res) => setTimeout(res, 2000));
      spinner2.succeed();
    } catch (error) {
      spinner2.fail();
      return print(error);
    }

    print(`\n${green('初始化完成')}, 接下来你可以运行以下命令进行开发:\n`);
    print(`$ cd ${options.projectName}`);
    print(`$ ${options.installer || 'pnpm'} install`);
    print(`$ ${options.installer || 'pnpm'} run dev`);
    print();
  });

program.parse();
