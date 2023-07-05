import { print } from '../utils';
import { installCommitlint } from './install-commitlint';
import { installEslint } from './install-eslint';
import { installHusky } from './install-husky';
import { installReleaseIt } from './install-release-it';
import { installLintStaged } from './install-lint-staged';
import { installPrettier } from './install-prettier';
import { bold } from 'kolorist';

export const installSpec = async (): Promise<void> => {
  const jobs = [
    {
      name: '安装 husky 依赖',
      job: async () => {
        await installHusky({ dir: './husky', installer: 'pnpm' });
      },
    },
    {
      name: '安装 commitlint 依赖',
      job: async () => {
        await installCommitlint({ dir: './husky', installer: 'pnpm' });
      },
    },
    {
      name: '安装 release-it 依赖',
      job: async () => {
        await installReleaseIt({ dir: './scripts/release-it', installer: 'pnpm' });
      },
    },
    {
      name: '安装 staged-lint 依赖',
      job: async () => {
        await installLintStaged({});
      },
    },
    {
      name: '安装 eslint 依赖',
      job: async () => {
        await installEslint({ gitHooksPath: './scripts', installer: 'pnpm' });
      },
    },
    {
      name: '安装 prettier 依赖',
      job: async () => {
        await installPrettier({ dir: './scripts', installer: 'pnpm' });
      },
    },
  ];
  print();
  for (const job of jobs) {
    const number = jobs.indexOf(job) + 1;
    print(bold(`第 ${number} 项： ${job.name}`));
    await job.job();
  }
};
