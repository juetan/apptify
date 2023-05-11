import { RangePicker } from "@arco-design/web-vue";
import { defineInput } from "./type";

export default defineInput<typeof RangePicker>({
  name: "range-picker",
  props: {
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    showTime: true,
    class: "w-full",
    allowClear: true,
  },
  render({ model, field, props }) {
    return <RangePicker v-model={model[field]} {...props}></RangePicker>;
  },
});
