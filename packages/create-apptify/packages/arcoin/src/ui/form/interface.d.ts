import { FieldRule, FormItemInstance } from '@arco-design/web-vue';
import { NodeType } from './form-node';

/**
 * 表单项额外props
 */
export type IFormItemProps = Partial<Omit<FormItemInstance['$props'], 'label' | 'render' | 'required' | 'disabled'>>;

/**
 * 表单子项
 */
export interface OFormItem {
  /**
   * 字段名
   * @description 用于表单校验和输入框值绑定
   */
  field: string;
  /**
   * 默认值
   */
  value?: any;
  /**
   * 标签名, 以slot:开头则使用插槽，例如：slot:label
   */
  label?: string;
  /**
   * 输入控件类型
   */
  type: string;
  /**
   * 输入控件的额外props
   */
  nodeProps?: Record<string, any>;
  /**
   * 表单项的额外props
   */
  itemProps?: IFormItemProps;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 校验规则
   */
  rules?: (FieldRule & { when?: (arg: { item: BhFormItem; model: BhFormModel }) => boolean })[];
  /**
   * 表单项是否可见
   */
  visible?: (model: Record<string, any>, item: IFormItem, items: IFormItem[]) => boolean;
  /**
   * 是否禁用
   */
  disabled?: (model: Record<string, any>, item: IFormItem, items: IFormItem[]) => boolean;
  /**
   * 选项，主要用于select, checkbox等需要用到选项的输入框，可以为以下值：
   */
  options?: SelectOptionData[] | ((arg: { item: BhFormItem; model: BhFormModel }) => Promise<any>);
  /**
   * 插槽名称
   * @description 通常用于自定义输入控件
   */
  slotname?: string;
  /**
   * 帮助插槽
   * @description 用于自定义表单项的帮助
   */
  help?: string;
  /**
   * 额外信息插槽
   * @description 用于自定义表单项的额外信息
   */
  extra?: string;
}

export type IFormItem = OFormItem & NodeType;

export interface IFormAction {
  type: 'submit' | 'reset' | 'cancel' | 'custom';
  label?: string;
  buttonProps?: Omit<ButtonInstance['$props'], 'loading'>;
}

export interface IOptions {
  /**
   * 表单项
   */
  items: IFormItem[];
  /**
   * 表单操作
   */
  actions?: IFormAction[];
  /**
   * 表单数据
   */
  model?: Record<string, any>;
  /**
   * 提交表单
   */
  submit?: (model: Record<string, any>, items: IFormItem[]) => Promise<any>;
  /**
   * 表单额外props
   */
  formProps?: Omit<FormInstance['$props'], 'model'>;
}
