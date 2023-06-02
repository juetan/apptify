import { FormItem as BaseFormItem, FieldRule, FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { NodeType, NodeUnion, nodeMap } from "./form-node";

const defineRuleMap = <T extends Record<string, FieldRule>>(ruleMap: T) => ruleMap;

const ruleMap = defineRuleMap({
  required: {
    required: true,
    message: "该项不能为空",
  },
  string: {
    type: "string",
    message: "请输入字符串",
  },
  number: {
    type: "number",
    message: "请输入数字",
  },
  email: {
    type: "email",
    message: "邮箱格式错误，示例: xx@abc.com",
  },
  url: {
    type: "url",
    message: "URL格式错误, 示例: www.abc.com",
  },
  ip: {
    type: "ip",
    message: "IP格式错误, 示例: 101.10.10.30",
  },
  phone: {
    match: /^(?:(?:\+|00)86)?1\d{10}$/,
    message: "手机格式错误, 示例(11位): 15912345678",
  },
  idcard: {
    match: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: "身份证格式错误, 长度为15或18位",
  },
  alphabet: {
    match: /^[a-zA-Z]\w{4,15}$/,
    message: "请输入英文字母, 长度为4~15位",
  },
  password: {
    match: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    message: "至少包含大写字母、小写字母、数字和特殊字符",
  },
});

export type FieldStringRule = keyof typeof ruleMap;

export type FieldObjectRule = FieldRule & {
  disable?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;
};

export type FieldRuleType = FieldStringRule | FieldObjectRule;

/**
 * 表单项
 */
export const FormItem = (props: any, { emit }: any) => {
  const { item } = props;
  const args = {
    ...props,
    field: item.field,
  };

  const rules = computed(() => {
    const result = [];
    if (item.required) {
      result.push(ruleMap.required);
    }
    item.rules?.forEach((rule: any) => {
      if (typeof rule === "string") {
        result.push(ruleMap[rule as FieldStringRule]);
        return;
      }
      if (!rule.disable) {
        result.push(rule);
        return;
      }
      if (!rule.disable({ model: props.model, item, items: props.items })) {
        result.push(rule);
      }
    });
    return result;
  });

  const disabled = computed(() => {
    if (item.disable === undefined) {
      return false;
    }
    if (typeof item.disable === "function") {
      return item.disable(args);
    }
    return item.disable;
  });

  if (item.visible && !item.visible(args)) {
    return null;
  }

  return (
    <BaseFormItem rules={rules.value} disabled={disabled.value} field={item.field} {...item.itemProps}>
      {{
        default: () => {
          if (item.component) {
            return <item.component {...item.nodeProps} />;
          }
          const comp = nodeMap[item.type as NodeType]?.component;
          if (!comp) {
            return null;
          }
          if (item.type === "submit") {
            return <comp loading={props.loading} onSubmit={() => emit("submit")} onCancel={emit("cancel")} />;
          }
          return <comp v-model={props.model[item.field]} {...item.nodeProps} />;
        },
        label: item.label && (() => (typeof item.label === "string" ? item.label : item.label?.(args))),
        help: item.help && (() => (typeof item.help === "string" ? item.help : item.help?.(args))),
        extra: item.extra && (() => (typeof item.extra === "string" ? item.extra : item.extra?.(args))),
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
  label?: string | ((item: IFormItem, model: Record<string, any>) => any);

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
  rules?: FieldRuleType[];

  /**
   * 是否可见
   */
  visible?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 是否禁用
   */
  disable?: (arg: { item: IFormItem; model: Record<string, any> }) => boolean;

  /**
   * 选项，数组或者函数
   */
  options?: SelectOptionData[] | ((arg: { item: IFormItem; model: Record<string, any> }) => Promise<any>);

  /**
   * 表单项内容的渲染函数
   */
  component?: (args: { item: IFormItem; model: Record<string, any>; field: string }) => any;

  /**
   * 帮助提示
   */
  help?: string | ((args: { item: IFormItem; model: Record<string, any> }) => any);

  /**
   * 额外内容
   */
  extra?: string | ((args: { item: IFormItem; model: Record<string, any> }) => any);
};

export type IFormItem = FormItemBase & NodeUnion;
