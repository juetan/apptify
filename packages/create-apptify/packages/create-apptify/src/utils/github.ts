import downloadGitRepo from 'download-git-repo';

/**
 * 下载Github仓库到指定目录
 * @param repo 仓库地址，支持#分隔符指定分支
 * @param dest 目标目录
 * @example saveGithubRepoTo('owner/repo#master', './app')
 * @returns
 */
export const saveGithubRepoTo = async (repo: string, dest: string) => {
  const proxy = 'https://ghproxy.com/';
  const [repository, branch = 'master'] = repo.split('#');
  const githubUrl = `https://github.com/${repository}/archive/${branch}.zip`;
  const url = `direct:${proxy}${githubUrl}`;
  return new Promise<void>((resolve, reject) => {
    downloadGitRepo(url, dest, (e) => (e ? reject(e) : resolve()));
  });
};
