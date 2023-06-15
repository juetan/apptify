import ora, { Ora } from 'ora';
import { print } from './exec';

export const defineWorkflow = (
  workflow: {
    name: string;
    hideTime?: boolean;
    onBefore?: (...args: any[]) => void;
    job: (context: { spinner: Ora }) => void | Promise<void>;
  }[],
) => {
  const run = async () => {
    print();
    for (const work of workflow) {
      const number = workflow.indexOf(work) + 1;
      const spinner = ora(`[${number}] ${work.name}`);
      try {
        spinner.start();
        const start = Date.now();
        work.onBefore?.();
        await work.job({ spinner });
        const end = Date.now();
        const time = ((end - start) / 1000).toFixed(2);
        spinner.succeed(work.hideTime ? '' : `[${number}] ${work.name}(用时: ${time} 秒)`);
      } catch (error: any) {
        spinner.fail();
        throw Error(error);
      }
    }
  };
  return { run };
};
