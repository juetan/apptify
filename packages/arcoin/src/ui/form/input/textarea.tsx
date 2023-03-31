import { Textarea } from '@arco-design/web-vue';
import { defineInput } from './type';

export default defineInput<typeof Textarea>({
  name: 'textarea',
  props: {
    placeholder: '请输入',
    allowClear: true,
  },
  render({ model, field, props }) {
    return <Textarea v-model={model[field]} {...props}></Textarea>;
  },
});
