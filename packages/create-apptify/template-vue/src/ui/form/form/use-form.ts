import { reactive } from "vue";
import { BhFormInstance } from ".";
import { inputer } from "../input";
import { BhFormItem } from "../interface";
import { getRenders, getRules, getSlots } from "./type";

interface UseFormOptions {
  items: BhFormItem[];
  model: any;
}

const truly = () => true;

export const useForm = (options: UseFormOptions) => {
  const { model = { id: undefined } } = options;
  const items: BhFormItem[] = [];
  const getForm = (): BhFormInstance => (items as any).instance;

  options.items.forEach((item) => {
    if (!item.inputProps) {
      item.inputProps = {};
    }
    const args = { props: item.inputProps, item, model };
    model[item.field] = item.defaultValue;
    const rules = getRules(item);
    const renders = { render: inputer.getRender(item.type), ...getSlots({ item, getForm }), ...getRenders({ item }) };
    const _item = { ...item, ...renders, rules };
    inputer.init(args);
    items.push(_item);
  });

  return reactive({ ...options, model, items });
};
