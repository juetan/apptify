import { Modal } from "@arco-design/web-vue";
import { assign } from "lodash-es";
import { reactive } from "vue";
import { useForm } from "./use-form";
import { FormModalProps } from "./form-modal";

const defaults: Partial<InstanceType<typeof Modal>> = {
  width: 1080,
  titleAlign: "start",
};

export const useFormModal = (options: FormModalProps): FormModalProps & { model: Record<string, any> } => {
  const { model, items } = options || {};

  const form = useForm({ model, items });

  return reactive(assign({ modalProps: { ...defaults } }, { ...options, ...form }));
};
