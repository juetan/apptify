import { Modal } from "@arco-design/web-vue";
import { assign } from "lodash-es";
import { reactive } from "vue";
import { BhFormModalProps } from ".";
import { useForm } from "../form/use-form";

const defaults: Partial<InstanceType<typeof Modal>> = {
  width: 1080,
  titleAlign: "start",
};

export const useFormModal = (options: BhFormModalProps) => {
  const { model, items } = options || {};

  const form = useForm({ model, items });

  return reactive(assign({ modalProps: { ...defaults } }, { ...options, ...form }));
};
