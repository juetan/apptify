import { DatePicker } from "@arco-design/web-vue";
import { defineInput } from "./type";

export default defineInput<typeof DatePicker>({
  props: {
    format: "YYYY-MM-DD HH:mm:ss",
    showTime: true,
    class: "w-full",
  },
  render({ model, field, props }) {
    return <DatePicker v-model={model[field]} {...props}></DatePicker>;
  },
});
