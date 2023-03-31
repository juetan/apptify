import { DateTimeDict } from '@/config';
import { RangePicker } from '@arco-design/web-vue';
import { defineInput } from './type';

export default defineInput<typeof RangePicker>({
  name: 'rangePicker',
  props: {
    format: DateTimeDict.DATETIME,
    valueFormat: DateTimeDict.DATETIME,
    showTime: true,
    class: 'w-full',
    allowClear: true,
  },
  render({ model, field, props }) {
    return <RangePicker v-model={model[field]} {...props}></RangePicker>;
  },
});
