export const installerOptions = [
  {
    value: 'pnpm',
    short: 'Pnpm',
    name: `Pnpm: 推荐使用，速度快，占用空间小`,
  },
  {
    value: 'npm',
    short: 'Npm',
    name: `Npm : 速度慢，占用空间大`,
  },
  {
    value: 'yarn',
    short: 'Yarn',
    name: `Yarn: 速度一般，占用空间大`,
  },
  {
    value: 'none',
    short: 'None',
    name: `None: 不安装依赖，手动安装`,
  },
];

export const buildInstallCmd = (installer: string, pkg?: string) => {
  let install = installer === 'yarn' ? 'add' : 'install';
  if (!pkg && installer === 'yarn') {
    install = 'install';
  }
  return pkg;
};
