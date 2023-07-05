import { Form as BaseForm, FormInstance as BaseFormInstance, Message } from "@arco-design/web-vue";
import { defaultsDeep } from "lodash-es";
import { PropType } from "vue";
import { FormItem, IFormItem } from "./form-item";
import { NodeType, nodeMap } from "./form-node";

/**
 * 表单组件
 */
export const Form = defineComponent({
  name: "Form",
  props: {
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => reactive({}),
    },
    /**
     * 表单项
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    /**
     * 提交表单
     */
    submit: {
      type: Function as PropType<(arg: { model: Record<string, any>; items: IFormItem[] }) => Promise<any>>,
    },
    /**
     * 传给Form组件的参数
     */
    formProps: {
      type: Object as PropType<Omit<BaseFormInstance["$props"], "model">>,
    },
  },
  setup(props) {
    const formRef = ref<InstanceType<typeof BaseForm>>();
    const loading = ref(false);

    props.items.forEach((item: any) => {
      if (item.init) {
        item.init({ item, model: props.model });
      }
      defaultsDeep(item, {
        nodeProps: nodeMap[item.type as NodeType]?.initialProps || {},
      });
    });

    const getItem = (field: string) => {
      return props.items.find((item) => item.field === field);
    };

    const submitForm = async () => {
      try {
        loading.value = true;
        const res = await props.submit?.({ model: props.model, items: props.items });
        res.message && Message.success(`提示: ${res.message}`);
      } finally {
        loading.value = false;
      }
    };

    return {
      formRef,
      loading,
      getItem,
      submitForm,
    };
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
        return item.visible({ ...props, item });
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

export type FormInstance = InstanceType<typeof Form>;

export type FormProps = FormInstance["$props"];

export type FormDefinedProps = Pick<FormProps, "model" | "items" | "submit" | "formProps">;

export default Form;