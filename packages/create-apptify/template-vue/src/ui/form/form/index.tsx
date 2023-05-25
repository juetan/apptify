import { Form, FormInstance } from "@arco-design/web-vue";
import { PropType, defineComponent, reactive, ref } from "vue";
import { isVisibled } from "../helper";
import { BhFormModel, BhFormItem as IFormItem } from "../interface";
import { BhFormItem } from "../item";

/**
 * 表单组件
 */
export const BhForm = defineComponent({
  name: "Form",
  props: {
    /**
     * 表单项
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<BhFormModel>,
      default: () => reactive({}),
    },
    /**
     * 表单底部
     */
    footer: {
      type: [Boolean, () => Element],
    },
  },
  setup(props) {
    const FormRef = ref<FormInstance>();

    return {
      FormRef,
    };
  },
  methods: {
    /**
     * 根据字段名获取表单项
     * @param field 字段名
     * @returns
     */
    getItem(field: string) {
      return this.items.find((item) => item.field === field);
    },

    /**
     * 根据字段名获取表单项的选项列表(用于下拉框等)
     * @param field 字段名
     */
    updateOptions(field: string) {
      this.getItem(field)?._updateOptions?.();
    },
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

/**
 * 表单实例类型
 */
export type BhFormInstance = InstanceType<typeof BhForm>;

/**
 * 表单组件参数
 */
export type BhFormProps = BhFormInstance["$props"] & InstanceType<typeof Form>["$props"];
