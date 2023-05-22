import { Form as BaseForm, FormInstance } from "@arco-design/web-vue";
import { defaultsDeep } from "lodash-es";
import { PropType } from "vue";
import { FormItem } from "./form-item";
import { NodeType, nodeMap } from "./form-node";

/**
 * 表单组件
 */
export const Form = defineComponent({
  name: "Form",
  props: {
    /**
     * 表单项
     */
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<any>,
      default: () => reactive({}),
    },
    /**
     * 传给Form组件的参数
     */
    formProps: {
      type: Object as PropType<FormInstance["$props"]>,
    },
    /**
     * 表单底部
     */
    footer: {
      type: [Boolean, () => Element],
    },
    /**
     * 提交表单
     */
    submit: {
      type: Function as PropType<(arg: { model: Record<string, any>; items: any[] }) => Promise<any>>,
    },
  },
  setup(props) {
    const formRef = ref<InstanceType<typeof BaseForm>>();
    const loading = ref(false);

    props.items.forEach((item) => {
      if (item.init) {
        item.init({ item, model: props.model });
      }
      defaultsDeep(item, {
        nodeProps: nodeMap[item.type as NodeType]?.initialProps || {},
      });
    });

    return {
      formRef,
      loading,
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

    submitForm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  render() {
    (this.items as any).instance = this;
    const props = {
      items: this.items,
      model: this.model,
      slots: this.$slots,
    };
    const items = this.items.filter((item) => {
      if (item.visible === undefined) {
        return true;
      }
      if (typeof item.visible === "function") {
        return item.visible(props);
      }
      return item.visible;
    });

    return (
      <BaseForm ref="FormRef" layout="vertical" model={this.model} {...this.$attrs} {...this.formProps}>
        {items.map((item) => (
          <FormItem loading={this.loading} onSubmit={this.submitForm} item={item} {...props}></FormItem>
        ))}
      </BaseForm>
    );
  },
});
