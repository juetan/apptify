import { TreeSelect } from "@arco-design/web-vue";
import { isFunction } from "lodash-es";
import { reactive } from "vue";
import { defineInput } from "./type";

export default defineInput<typeof TreeSelect>({
  name: "select",
  props: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    data: [],
  },
  init({ item, model }) {
    if (Array.isArray(item.options)) {
      item.inputProps.data = item.options;
      return;
    }
    if (!isFunction(item.options)) {
      return;
    }
    item.inputProps.data = reactive([]);
    const fetchData = item.options;
    item._updateOptions = async () => {
      let data = await fetchData({ item, model });
      if (Array.isArray(data?.data)) {
        data = data.data.map(({ id: value, name: label }: any) => ({ label, value }));
      }
      if (Array.isArray(data)) {
        item.inputProps.data.splice(0);
        item.inputProps.data.push(...data);
      }
    };
    item._updateOptions();
  },
  render({ item, model }) {
    return <TreeSelect v-model={model[item.field]} {...item.inputProps}></TreeSelect>;
  },
});
