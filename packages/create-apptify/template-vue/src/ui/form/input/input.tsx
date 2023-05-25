import { Input } from '@arco-design/web-vue';
import { defineInput } from './type';

export default defineInput<typeof Input>({
  name: 'input',
  props: {
    placeholder: '请输入',
    allowClear: true,
  },
  render({ model, field, props }) {
    return <Input v-model={model[field]} {...props}></Input>;
  },
});
