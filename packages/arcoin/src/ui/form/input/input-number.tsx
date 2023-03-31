import { InputNumber } from '@arco-design/web-vue';
import { defineInput } from './type';

export default defineInput<typeof InputNumber>({
  name: 'input-number',
  props: {
    placeholder: '请输入',
    defaultValue: 0,
    allowClear: true,
  },
  render({ item, model }) {
    return <InputNumber v-model={model[item.field]} {...item.inputProps}></InputNumber>;
  },
});
