import { FormItem as BaseFormItem, FieldRule, FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { NodeType, NodeUnion, nodeMap } from "./form-node";

/**
 * 表单项
 */
export const FormItem = (props: any, { emit }: any) => {
  const { item } = props;
  const args = {
    ...props,
    field: item.field,
  };

  console.log("itemprops", props.itemProps);

  const rules = computed(() => {
    return item.rules?.filter((rule: any) => {
      if (rule.when === undefined) {
        return true;
      }
      if (typeof rule.when === "function") {
        return rule.when(args);
      }
      return rule.when;
    });
  });

  const disabled = computed(() => {
    if (item.disabled === undefined) {
      return false;
    }
    if (typeof item.disabled === "function") {
      return item.disabled(args);
    }
    return item.disabled;
  });

  return (
    <BaseFormItem
      rules={rules.value}
      disabled={disabled.value}
      label={item.label}
      field={item.field}
      {...item.itemProps}
    >
      {{
        default: () => {
          if (item.render) {
            return item.render(args);
          }
          const comp = nodeMap[item.type as NodeType]?.component;
          if (item.type === "submit") {
            return <comp loading={props.loading} onSubmit={() => emit("submit")} onCancel={emit("cancel")} />;
          }
          return <comp v-model={props.model[item.field]} {...item.nodeProps} />;
        },
        labelRender: item.labelRender && (() => item.labelRender?.(args)),
        helpRender: item.helpRender && (() => item.helpRender?.(args)),
        extraRender: item.extraRender && (() => item.extraRender?.(args)),
      }}
    </BaseFormItem>
  );
};

type FormItemBase = {
  /**
   * 字段名，会用于表单校验和输入框绑定
   */
  field: string;

  /**
   * 初始值
   */
  initialValue?: any;

  /**
   * 标签名
   */
  label?: string;

  /**
   * 传递给`FormItem`组件的参数
   */
  itemProps?: Partial<Omit<FormItemInstance["$props"], "field" | "label" | "required" | "rules" | "disabled">>;

  /**
   * 是否必填
   */
  required?: boolean;

  /**
   * 校验规则数组
   */
  rules?: (FieldRule & { when?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean })[];

  /**
   * 是否可见
   */
  visible?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 是否禁用
   */
  disabled?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 选项，数组或者函数
   */
  options?: SelectOptionData[] | ((arg: { item: IFormItem; model: Record<string, any> }) => Promise<any>);

  /**
   * 表单项内容的渲染函数
   */
  render?: (item: any, input: any, model: Record<string, any>) => any;
};

export type IFormItem = FormItemBase & NodeUnion;
