import enquirer from 'enquirer';
import fs from 'fs';
import { bold, gray, green } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { exec, print } from '../utils';

export const installHusky = async () => {
  interface Option {
    dir: string;
    packageManager: string;
  }
  const option = await enquirer.prompt<Option>([
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

  const spinner3 = ora(`安装 husky 依赖`);
  const inst = packageManager === 'yarn' ? 'add' : 'install';
  const cmd = `${packageManager} ${inst} -D husky`;
  try {
    spinner3.start();
    await exec(cmd);
    spinner3.succeed();
  } catch (error) {
    spinner3.fail();
    return print(error);
  }

  const spin1 = ora(`执行 husky install 命令: ${gray(`创建 ${dir} 目录并设置 git config core.hooksPath 指向该目录`)}`);
  try {
    spin1.start();
    await exec(`npx husky install "${dir}"`);
    spin1.succeed();
  } catch (error) {
    spin1.fail();
    return print(error);
  }

  const spin2 = ora(`添加 prepare 钩子到 package.json 文件中`);
  try {
    spin2.start();
    await exec(`npm set-script prepare "husky install ${dir}"`);
    spin2.succeed();
    print(`${bold(green('\n恭喜'))}, 安装完成！, 接下来你可以通过以下命令添加钩子:\n`);
    print(`npx husky add scripts/husky/<pre-commit> "<钩子内容>"\n`);
  } catch (error) {
    spin2.fail();
    return print(error);
  }
};
