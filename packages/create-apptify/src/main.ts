import { program } from 'commander';
import { red } from 'kolorist';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { installCommitlint, installHusky, installReleaseIt } from './install';
import { LOGO, print, readPackage } from './utils';
import { initProject } from './init';
import inquirer from 'inquirer';

const __dirname = path.join(fileURLToPath(import.meta.url), '..');
const pkg = readPackage(join(__dirname, '..'));
const printLOGO = () => {
  print(LOGO);
  print(`${'欢迎使用 Apptify CLI 工具'}! 版本: v${pkg.version}\n`);
};

program
  .command('install [name]')
  .alias('i')
  .description('安装依赖并进行初始化操作')
  .option('--installer <installer>', '指定包管理器')
  .action(async (name: string, options: Record<string, any>) => {
    if (!name) {
      const answers = await inquirer.prompt<any>([
        {
          name: 'name',
          message: '请选择要安装的库',
          type: 'rawlist',
          choices: [
            {
              value: 'husky',
              short: 'husky',
              name: '[ husky      ]: git 钩子管理工具',
            },
            {
              value: 'commitlint',
              short: 'commitlint',
              name: '[ commitlint ]: git 提交信息校验工具',
            },
            {
              value: 'release-it',
              short: 'release-it',
              name: '[ release-it ]: git 版本发布工具',
            },
            {
              value: 'prettier',
              short: 'prettier',
              name: '[ prettier   ]: 代码格式化工具',
            },
            {
              value: 'eslint',
              short: 'eslint',
              name: '[ eslint     ]: 代码检查工具',
            },
          ],
        },
      ]);
      name = answers.name;
    }
    if (name === 'release-it') {
      installReleaseIt({ ...options, workDir: __dirname });
    }
    if (name === 'husky') {
      installHusky(options);
    }
    if (name === 'commitlint') {
      installCommitlint(options);
    }
    if (!['release-it', 'husky', 'commitlint'].includes(name)) {
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
  .command('init [name]')
  .description('初始化项目')
  .option('-p, --path <path>', '指定项目路径')
  .option('-desc, --description <description>', '项目描述')
  .option('-t, --type <type>', '指定项目类型')
  .option('--install', '是否自动安装依赖')
  .option('--installer <installer>', '指定包管理器, 默认为pnpm')
  .action(async (name: string, args: any) => {
    initProject({ name, ...args });
  });

const run = () => {
  printLOGO();
  program.parse();
};

run();
