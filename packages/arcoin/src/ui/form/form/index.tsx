import { Form, FormInstance } from '@arco-design/web-vue';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { BhFormItem } from '../item';
import { isVisibled } from '../helper';
import { BhFormItem as IFormItem, BhFormModel } from '../interface';
import { inputer } from '../input';

export const BhForm = defineComponent({
  name: 'BhForm',
  props: {
    items: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    model: {
      type: Object as PropType<BhFormModel>,
      default: () => reactive({}),
    },
    footer: {
      type: [Boolean, () => Element],
    },
  },
  setup(props) {
    const FormRef = ref<FormInstance>();

    props.items.forEach((item) => {
      const args = { props: item.inputProps, item, model: props.model };
      if (!item.inputProps) item.inputProps = {};
      inputer.init(args);
      Object.assign(props.model, { [item.field]: item.defaultValue });
    });

    const getItem = (field: string) => props.items.find((item) => item.field === field);

    const updateOptions = (field: string) => getItem(field)?._updateOptions?.();

    return {
      FormRef,
      getItem,
      updateOptions,
    };
  },
  render() {
    (this.items as any).instance = this;
    const props = { items: this.items, model: this.model, slots: this.$slots };
    const items = this.items.filter((item) => isVisibled({ ...props, item }));

    return (
      <Form ref="FormRef" model={this.model} {...this.$attrs}>
        {items.map((item) => (
          <BhFormItem item={item} {...props}></BhFormItem>
        ))}
      </Form>
    );
  },
});

export type BhFormInstance = InstanceType<typeof BhForm>;

export type BhFormProps = BhFormInstance['$props'] & InstanceType<typeof Form>['$props'];
