import { FieldRule } from "@arco-design/web-vue";

/**
 * 表单数据
 */
export interface BhFormModel {
  [key: string]: any;
}

/**
 * 控件类型(与ArcoDesign的输入控件类型一致)
 */
export type BhInputType = any;

/**
 * 表单控件
 */
export interface FormInput {
  [key: string]: any;
}

export type FormItemRender<T, C, P> = (item: T, input: C, model: P) => any;

/**
 * 表单子项
 */
export interface BhFormItem {
  /**
   * 标签名
   */
  label?: string;

  /**
   * 字段名，会用于表单校验和输入框绑定
   */
  field: string;

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 输入框类型
   */
  type: BhFormInputType;

  /**
   * 传递给`type`参数对应组件的参数
   */
  inputProps?: BhFormInput;

  /**
   * 传递给`FormItem`组件的参数
   */
  itemProps?: any;

  /**
   * 校验规则数组
   */
  rules?: (FieldRule & { when?: (arg: { item: BhFormItem; model: BhFormModel }) => boolean })[];

  /**
   * 是否可见
   */
  visible?: boolean | ((arg: { item: BhFormItem; model: BhFormModel }) => boolean);

  /**
   * 是否禁用
   */
  disabled?: boolean | ((arg: { item: BhFormItem; model: BhFormModel }) => boolean);

  /**
   * 选项，数组或者函数
   */
  options?: SelectOptionData[] | ((arg: { item: BhFormItem; model: BhFormModel }) => Promise<any>);

  /**
   * 默认插槽名
   */
  slotName?: string;

  /**
   * 标签插槽名
   */
  labelSlotName?: string;

  /**
   * 帮助插槽名
   */
  helpSlotName?: string;

  /**
   * 额外信息插槽名
   */
  extraSlotName?: string;

  /**
   * 默认渲染函数
   */
  render?: (arg: any) => any;

  /**
   * 标签渲染函数
   */
  labelRender?: (arg: any) => any;

  /**
   * 帮助渲染函数
   */
  helpRender?: (arg: any) => any;

  /**
   * 额外信息渲染函数
   */
  extraRender?: (arg: any) => any;

  /** 其他值，支持@arco-design/web-vue中form-item的所有参数 */
  [key: string]: any;
}

export interface BhFunctionArgument {
  item: BhFormItem;
  items?: BhFormItem[];
  model: BhFormModel;
}

export type BhFormItemProps = BhFunctionArgument & { slots: Record<string, any> };

export type BhItemVisibled = (arg: BhFunctionArgument) => boolean;
export type BhItemDisabled = (arg: BhFunctionArgument) => boolean;

export type BhFormAction = (arg: { model: any; items: BhFormItem[] }) => Promise<any>;

export type Render = {
  /**
   * 表单项名称
   * @description 与ArcoDesign的数据控件名保持一致
   */
  name: BhInputType;
  /**
   * 设置函数
   * @description 在这里有机会修改FormItem的FormModel
   */
  setup: (arg: BhFunctionArgument) => void;
  /**
   * 渲染函数
   * 渲染对应的组件
   */
  render: (arg: BhFunctionArgument) => JSX.Element;
};
