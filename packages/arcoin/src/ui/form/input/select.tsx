import { Select } from '@arco-design/web-vue';
import { isArray, isFunction } from 'lodash';
import { defineInput } from './type';

export default defineInput<typeof Select>({
  name: 'select',
  props: {
    placeholder: '请选择',
    allowClear: true,
    allowSearch: true,
    options: [],
  },
  init({ item, model }) {
    if (isArray(item.options)) {
      item.inputProps.options = item.options;
      return;
    }

    if (!isFunction(item.options)) return;
    const fetchData = item.options;
    item._updateOptions = async () => {
      // @ts-ignore
      if (!fetchData.IS_SERVER_API1) {
        // @ts-ignore
        const data = (await fetchData()).data.map(({ id: value, name: label }) => ({ label, value }));
        item.inputProps.options = Array.isArray(data) ? data : [];
        return;
      }
      const data = await fetchData({ item, model });
      item.inputProps.options = Array.isArray(data) ? data : [];
    };
    item._updateOptions();
  },
  render({ item, model }) {
    return <Select v-model={model[item.field]} {...item.inputProps}></Select>;
  },
});
