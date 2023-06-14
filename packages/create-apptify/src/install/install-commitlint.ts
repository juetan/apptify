import enquirer from 'enquirer';
import fs from 'fs';
import { bold, green } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { addToPackage, exec, print } from '../utils';

export const installCommitlint = async () => {
  const option = await enquirer.prompt<{ dir: string; packageManager: string }>([
    {
      name: 'dir',
      message: '请选择配置文件的放置目录',
      type: 'input',
      initial: 'scripts/husky',
    },
    {
      name: 'packageManager',
      message: '请选择包管理器',
      type: 'select',
      choices: ['npm', 'yarn', 'pnpm'],
      initial: 'pnpm' as any,
    },
  ]);

  const { dir, packageManager } = option;
  if (!fs.existsSync(path.join(process.cwd(), dir))) {
    fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
  }

  print();
  const spinner1 = ora(`安装 @commitlint/cli 和 @commitlint/config-conventional 依赖`);
  const inst = packageManager === 'yarn' ? 'add' : 'install';
  const cmd = `${packageManager} ${inst} -D @commitlint/cli @commitlint/config-conventional`;
  try {
    spinner1.start();
    await exec(cmd);
    spinner1.succeed();
  } catch (error) {
    spinner1.fail();
    return print(error);
  }

  const spinner2 = ora(`添加 commitlint 配置到 package.json 文件中`);
  try {
    spinner2.start();
    addToPackage('commitlint', { extends: ['@commitlint/config-conventional'] });
    spinner2.succeed();
  } catch (error) {
    spinner2.fail();
    return print(error);
  }

  const spinner3 = ora(`添加 commitlint 配置到 git commit-msg 钩子中`);
  try {
    spinner3.start();
    const fullPath = path.join(dir, 'commit-msg');
    fs.writeFileSync(fullPath, `npx --no-install commitlint --edit $1`);
    spinner3.succeed();
  } catch (error) {
    spinner3.fail();
    return print(error);
  }

  print();
  const spinner4 = ora(`安装 commitizen 和 cz-convetional-hangelog 依赖`);
  try {
    spinner4.start();
    await exec(`${packageManager} ${inst} -D commitizen cz-conventional-changelog`);
    spinner4.succeed();
  } catch (error) {
    spinner4.fail();
    return print(error);
  }

  const spinner5 = ora(`添加 commitizen 配置到 package.json 文件中`);
  try {
    spinner5.start();
    addToPackage('config', { commitizen: { path: 'cz-conventional-changelog' } });
    spinner5.succeed();
  } catch (error) {
    spinner5.fail();
    return print(error);
  }

  const spinner6 = ora(`添加 commit 命令到 package.json 文件中`);
  try {
    spinner6.start();
    await exec(`npm set-script commit "cz"`);
    spinner6.succeed();
  } catch (error) {
    spinner6.fail();
    return print(error);
  }

  print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令添加钩子:\n`);
};
