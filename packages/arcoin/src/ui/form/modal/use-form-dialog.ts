import { Modal } from '@arco-design/web-vue';
import { BhFormModalProps } from '.';
import { useForm } from '../form/use-form';

const defaults: Partial<InstanceType<typeof Modal>> = {
  titleAlign: 'start',
};

export const useFormDialog = (options: BhFormModalProps) => {
  const { model, items } = options || {};

  const formProps = useForm({ model, items });

  return { ...defaults, ...options, formProps };
};
