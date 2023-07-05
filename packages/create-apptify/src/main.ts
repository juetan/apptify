import { program } from 'commander';
import inquirer from 'inquirer';
import { red } from 'kolorist';
import path from 'path';
import { fileURLToPath } from 'url';
import { initProject } from './init';
import { print, printBanner } from './utils';
import {
  installCommitlint,
  installHusky,
  installLintStaged,
  installReleaseIt,
  installSpec,
  installEslint,
  installPrettier,
} from './install';

const __dirname = path.join(fileURLToPath(import.meta.url), '..');

program.option('--dry-run', '打印执行命令, 但不执行命令');

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
          type: 'list',
          choices: [
            {
              value: 'husky',
              short: 'husky',
              name: '[ husky       ]: 提交钩子管理工具(git)',
            },
            {
              value: 'lint-staged',
              short: 'lint-staged',
              name: '[ lint-staged ]: 只校验提交的代码(git)',
            },
            {
              value: 'release-it',
              short: 'release-it',
              name: '[ release-it  ]: 版本发布记录工具(git)',
            },
            {
              value: 'commitlint',
              short: 'commitlint',
              name: '[ commitlint  ]: 提交信息校验工具(git)',
            },
            {
              value: 'eslint',
              short: 'eslint',
              name: '[ eslint      ]: 代码质量检查工具',
            },
            {
              value: 'prettier',
              short: 'prettier',
              name: '[ prettier    ]: 代码样式格式工具',
            },
            {
              value: 'allinone',
              short: 'allinone',
              name: '[ allinone    ]: 一键安装以上工具',
            },
          ],
        },
      ]);
      name = answers.name;
    }
    if (name === 'allinone') {
      return installSpec();
    }
    if (name === 'release-it') {
      return installReleaseIt({ ...options, workDir: __dirname });
    }
    if (name === 'husky') {
      return installHusky(options);
    }
    if (name === 'commitlint') {
      return installCommitlint(options);
    }
    if (name === 'eslint') {
      return installEslint(options);
    }
    if (name === 'prettier') {
      return installPrettier(options);
    }
    if (name === 'lint-staged') {
      return installLintStaged(options);
    }
    {
      print(`${red('x')} ${`抱歉，暂不支持安装 ${name} 库, 目前仅支持:\n`}`);
      print(`  [ husky       ]: git 钩子管理工具`);
      print(`  [ commitlint  ]: git 提交信息校验工具`);
      print(`  [ release-it  ]: git 版本发布工具`);
      print(`  [ prettier    ]: 代码格式化工具`);
      print(`  [ eslint      ]: 代码检查工具`);
      print(`  [ stylelint   ]: 样式检查工具`);
      print(`  [ lint-staged ]: 只检查提交的代码`);
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
  printBanner();
  program.parse();
};

run();
