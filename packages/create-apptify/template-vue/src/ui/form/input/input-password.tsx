import { InputPassword } from "@arco-design/web-vue";
import { defineInput } from "./type";

export default defineInput<typeof InputPassword>({
  name: "input-password",
  props: {
    placeholder: "请输入",
  } as any,
  render({ model, field, props }) {
    return <InputPassword v-model={model[field]} {...props}></InputPassword>;
  },
});
