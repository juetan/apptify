import { FieldRule, FormInstance, FormItemInstance, SelectOptionData } from "@arco-design/web-vue";
import { NodeUnion } from "./form-node";

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
  rules?: (FieldRule & { when?: (arg: { item: FormItem; model: Record<string, any> }) => boolean })[];

  /**
   * 是否可见
   */
  visible?: (arg: { item: FormItem; model: Record<string, any> }) => boolean;

  /**
   * 是否禁用
   */
  disabled?: (arg: { item: FormItem; model: Record<string, any> }) => boolean;

  /**
   * 选项，数组或者函数
   */
  options?: SelectOptionData[] | ((arg: { item: FormItem; model: Record<string, any> }) => Promise<any>);

  /**
   * 表单项内容的渲染函数
   */
  render?: (item: any, input: any, model: Record<string, any>) => any;
};

type FormItem = FormItemBase & NodeUnion;

type Options = {
  /**
   * 表单项数组
   */
  items: FormItem[];
  /**
   * 表单数据模型
   */
  model?: Record<string, any>;
  /**
   * 表单实例属性
   */
  formProps?: Partial<FormInstance["$props"]>;
  footer?: boolean;
  /**
   * 提交表单
   */
  submit?: (arg: { model: Record<string, any>; items: FormItem[] }) => Promise<any>;
};

export const useForm = (options: Options) => {
  const { model = { id: undefined } } = options;
  const items: FormItem[] = [];

  options.items.forEach((item) => {
    if (!item.nodeProps) {
      item.nodeProps = {} as any;
    }
    model[item.field] = model[item.field] ?? item.initialValue;
    const _item = { ...item };
    items.push(_item);
  });

  if (options.footer === undefined) {
    const footer = items.find((item) => item.type === "footer");
    if (!footer) {
      items.push({
        field: "id",
        type: "footer",
        itemProps: {
          class: "space-x-2",
        },
      });
    }
  }

  return reactive({ ...options, model, items }) as any;
};
