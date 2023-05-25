import { Select } from "@arco-design/web-vue";
import { isFunction } from "lodash-es";
import { reactive } from "vue";
import { defineInput } from "./type";

export default defineInput<typeof Select>({
  name: "select",
  props: {
    placeholder: "请选择",
    allowClear: true,
    allowSearch: true,
    options: [],
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
        data = data.data.map(({ id: value, name: label }: any) => ({ label, value }));
        // data.unshift({ label: '全部', value: undefined });
      }
      if (Array.isArray(data)) {
        item.inputProps.options.splice(0);
        item.inputProps.options.push(...data);
      }
    };
    item._updateOptions();
  },
  render({ item, model }) {
    return <Select v-model={model[item.field]} {...item.inputProps}></Select>;
  },
});
