/// <reference types="vite/client" />

declare module 'download-git-repo' {
  type Callback = (err: Error | null) => void;
  type OptionsOrCb = Callback | { clone: boolean; [k: string]: any };
  const download: (repo: string, dest: string, OptionsOrCb?: OptionsOrCb, cb?: Callback) => void;
  export default download;
}
