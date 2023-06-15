export const installerOptions = [
  {
    value: 'pnpm',
    short: 'pnpm',
    name: `pnpm: 推荐使用，速度快，占用空间小`,
  },
  {
    value: 'npm',
    short: 'npm',
    name: `npm : 速度慢，占用空间大`,
  },
  {
    value: 'yarn',
    short: 'yarn',
    name: `yarn: 速度一般，占用空间大`,
  },
];

export const buildInstallCmd = (installer: string, pkg?: string) => {
  let install = installer === 'yarn' ? 'add' : 'install';
  if(!pkg && installer === 'yarn') {
    install = 'install';
  }
}