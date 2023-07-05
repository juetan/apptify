import { green } from 'kolorist';
import ora, { Ora } from 'ora';
import { print } from './exec';

interface Workflow {
  name: string;
  hideTime?: boolean;
  onBefore?: (...args: any[]) => void;
  job: (context: { spinner: Ora | null }) => void | Promise<void>;
}

export const defineWorkflow = (workflow: Workflow[]) => {
  const run = async (options?: { silent?: boolean }) => {
    print();
    for (const work of workflow) {
      const number = workflow.indexOf(work) + 1;
      const text = `[${number}] ${work.name}`;
      const spinner = options?.silent ? null : ora(text);
      try {
        work.onBefore?.();
        spinner?.start();
        const start = Date.now();
        await work.job({ spinner });
        const end = Date.now();
        const time = ((end - start) / 1000).toFixed(2);
        spinner?.succeed(work.hideTime ? '' : `${text}(用时: ${green(time)} 秒)`);
      } catch (error: any) {
        spinner?.fail();
        throw Error(error);
      }
    }
    print();
  };
  return { run };
};
