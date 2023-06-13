import enquirer from 'enquirer';
import fs from 'fs';
import { bold, green } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { exec, log } from '../utils';

export const installReleaseIt = async () => {
  interface Option {
    dir: string;
    packageManager: string;
  }

  const option = await enquirer.prompt<Option>([
    {
      name: 'dir',
      message: '请选择配置文件的放置目录',
      type: 'input',
      initial: 'scripts/release-it',
    },
    {
      name: 'autoInstall',
      message: '是否自动安装依赖',
      type: 'confirm',
      initial: true,
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

  const spinner1 = ora(`复制 配置文件 到 ${dir} 目录下`);
  try {
    spinner1.start();
    fs.cpSync(path.join(__dirname, '../files/release-it'), path.join(process.cwd(), dir), {
      recursive: true,
    });
    spinner1.succeed();
  } catch (error) {
    spinner1.fail();
    return log(error);
  }

  const spinner2 = ora(`添加 release 命令到 package.json 文件中`);
  try {
    spinner2.start();
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.release = `release-it --config ${dir}/release-it.cjs`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner2.succeed();
  } catch (error) {
    spinner2.fail();
    return log(error);
  }

  const spinner3 = ora(`安装 release-it 和 @release-it/conventional-changelog 依赖`);
  const inst = packageManager === 'yarn' ? 'add' : 'install';
  const cmd = `${packageManager} ${inst} -D release-it @release-it/conventional-changelog`;
  try {
    spinner3.start();
    await exec(cmd);
    spinner3.succeed();
    log(`${bold(green('\n恭喜, 安装完成!\n'))}`);
  } catch (error) {
    spinner3.fail();
    return log(error);
  }
};
