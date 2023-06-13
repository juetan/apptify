import { spawn } from 'child_process';
import { program } from 'commander';
import enquirer from 'enquirer';
import fs from 'fs';
import { blue, bold, gray, green, red } from 'kolorist';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.join(fileURLToPath(new URL(import.meta.url)), '..');

const LOGO = blue(`
 ________       ______     ______     _________   ________      ______     __  __
/_______/\\     /_____/\\   /_____/\\   /________/\\ /_______/\\    /_____/\\   /_/\\/_/\\
\\::: _  \\ \\    \\:::_ \\ \\  \\:::_ \\ \\  \\__.::.__\\/ \\__.::._\\/    \\::::_\\/_  \\ \\ \\ \\ \\
 \\::(_)  \\ \\    \\:(_) \\ \\  \\:(_) \\ \\    \\::\\ \\      \\::\\ \\      \\:\\/___/\\  \\:\\_\\ \\ \\
  \\:: __  \\ \\    \\: ___\\/   \\: ___\\/     \\::\\ \\     _\\::\\ \\__    \\:::._\\/   \\::::_\\/
   \\:.\\ \\  \\ \\    \\ \\ \\      \\ \\ \\        \\::\\ \\   /__\\::\\__/\\    \\:\\ \\       \\::\\ \\
    \\__\\/\\__\\/     \\_\\/       \\_\\/         \\__\\/   \\________\\/     \\_\\/        \\__\\/
`);

const print = (...args: any[]) => console.log(...args);

const exec = (command: string, args: string[] = []) => {
  let result = '';
  let error: any = null;
  return new Promise<string>((resolve, reject) => {
    const p = spawn(command, args, { cwd: process.cwd(), shell: true });
    p.stdout.on('data', (data) => {
      result += data.toString();
    });
    p.on('error', (e) => {
      reject(e);
    });
    p.on('close', (code: number) => {
      if (code !== 0) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

export const readPkg = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
};

export const savePkg = (pkg: Record<string, any>) => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
};

export const addToPkg = (key: string, value: any) => {
  const pkg = readPkg();
  pkg[key] = value;
  savePkg(pkg);
};

export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object';

export const assign = (target: Record<string, any>, ...sources: Record<string, any>[]) => {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      if (isObject(target[key]) && isObject(source[key])) {
        assign(target[key], source[key]);
        return;
      }
      target[key] = source[key];
    });
  });
  return target;
};

print(LOGO);

program
  .command('install <name>')
  .alias('i')
  .description('安装依赖并进行初始化操作')
  .option('--installer', '指定包管理器, 默认为pnpm', 'pnpm')
  .action(async (name: string) => {
    if (name === 'release-it') {
      print(bold(`安装: release-it\n`));
      const option = await enquirer.prompt<{ dir: string; packageManager: string }>([
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
      print();

      const spinner1 = ora(`复制 配置文件 到 ${dir} 目录下`);
      try {
        spinner1.start();
        fs.cpSync(path.join(__dirname, '../files/release-it'), path.join(process.cwd(), dir), {
          recursive: true,
        });
        spinner1.succeed();
      } catch (error) {
        spinner1.fail();
        return print(error);
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
        return print(error);
      }

      const spinner3 = ora(`安装 release-it 和 @release-it/conventional-changelog 为开发依赖`);
      const inst = packageManager === 'yarn' ? 'add' : 'install';
      const cmd = `${packageManager} ${inst} -D release-it @release-it/conventional-changelog`;
      try {
        spinner3.start();
        await exec(cmd);
        spinner3.succeed();
        print(`${bold(green('\n恭喜, 安装完成!\n'))}`);
      } catch (error) {
        spinner3.fail();
        return print(error);
      }
    } else if (name === 'husky') {
      print(bold(`安装: husky\n`));
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

      const spin1 = ora(
        `执行 husky install 命令: ${gray(`创建 ${dir} 目录并设置 git config core.hooksPath 指向该目录`)}`,
      );
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
    } else if (name === 'commitlint') {
      print(bold(`安装: commitlint 和 commitizen\n`));
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
        addToPkg('commitlint', { extends: ['@commitlint/config-conventional'] });
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
        addToPkg('config', { commitizen: { path: 'cz-conventional-changelog' } });
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

program.parse();
