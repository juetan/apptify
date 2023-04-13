import { Input, InputNumber, Select } from '@arco-design/web-vue';
import { Component } from 'vue';

type Props<T> = T extends new (...args: any) => infer R ? (R extends { $props: any } ? R['$props'] : never) : never;

type Options<T extends Component = Component> = {
  id?: string;
  component: T;
  defaultProps?: Props<T>;
};

function defineNode<T extends Component>(options: Options<T>) {
  return options;
}

export const NodeMap = {
  input: defineNode({
    component: Input,
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
    },
  }),
  number: defineNode({
    component: InputNumber,
    defaultProps: {
      placeholder: '请输入',
      defaultValue: 0,
      allowClear: true,
    },
  }),
  select: defineNode({
    component: Select,
    defaultProps: {
      placeholder: '请选择',
      allowClear: true,
      allowSearch: true,
      options: [],
    },
  }),
};

export const NodeComponents = Object.entries(NodeMap).reduce((result, [id, node]) => {
  result[`a-${id}`] = node.component;
  return result;
}, {} as Record<string, Component>);

type TYPE<T extends Record<string, any>> = {
  [K in keyof T]: { type: K; nodeProps?: T[K]['defaultProps'] };
}[keyof T];

export type NodeType = TYPE<typeof NodeMap>;
