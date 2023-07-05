import { green } from 'kolorist';
import ora, { Ora } from 'ora';
import { print } from './print';

interface Workflow {
  name: string;
  hideTime?: boolean;
  skip?: () => boolean | Promise<boolean>;
  onBefore?: (...args: any[]) => void;
  job: (context: { spinner: Ora | null }) => void | Promise<void>;
}

interface RunOptions {
  silent?: boolean;
}

/**
 * 定义工作流
 */
export const defineWorkflow = (workflow: Workflow[]) => {
  const run = async (options?: RunOptions) => {
    print();
    let number = 0;
    for (const work of workflow) {
      if (await work.skip?.()) {
        continue;
      }
      number += 1;
      const text = `[${number}] ${work.name}`;
      const spinner = options?.silent ? null : ora(text);
      try {
        work.onBefore?.();
        spinner?.start();
        const start = Date.now();
        if (!process.argv.includes('--dry-run')) {
          await work.job({ spinner });
        }
        const end = Date.now();
        const time = ((end - start) / 1000).toFixed(2);
        spinner?.succeed(work.hideTime ? '' : `${text}(耗时: ${green(time)} 秒)`);
      } catch (error: any) {
        spinner?.fail();
        throw Error(error);
      }
    }
    print();
  };
  return { run };
};
