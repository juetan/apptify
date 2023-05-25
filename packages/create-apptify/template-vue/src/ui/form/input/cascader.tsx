import { Cascader } from "@arco-design/web-vue";
import { isFunction } from "lodash-es";
import { reactive } from "vue";
import { defineInput } from "./type";

export default defineInput<typeof Cascader>({
  props: {
    expandTrigger: "hover",
    allowClear: true,
    placeholder: "请选择",
  },
  init({ item, model }) {
    if (Array.isArray(item.options)) {
      item.inputProps.options = item.options;
      return;
    }
    if (!isFunction(item.options)) {
      return;
    }
    item.inputProps.options = reactive([]);
    const fetchData = item.options;
    item._updateOptions = async () => {
      let data = await fetchData({ item, model });
      if (Array.isArray(data?.data)) {
        data = data.data.map(({ id: value, name: label }: any) => ({
          label,
          value,
        }));
      }
      if (Array.isArray(data)) {
        item.inputProps.options.splice(0);
        item.inputProps.options.push(...data);
      }
    };
    item._updateOptions();
  },
  render({ model, field, props }) {
    return <Cascader v-model={model[field]} {...props}></Cascader>;
  },
});
