import { defaultsDeep } from 'lodash';
import { Component } from 'vue';

type Props<T> = T extends new (...args: any) => infer R ? (R extends { $props: any } ? R['$props'] : never) : never;

export type inputInitArg = { props: any; item: any; model: any };

export type InputRenderArg = { field: string; props: any; item: any; model: any; slots: any };

type Options<C extends Component, K = Props<C>> = {
  /** 组件名称 */
  name?: string;

  /** 组件参数 */
  props?: K;

  /** 初始化 */
  init?: (arg: inputInitArg) => any;

  render: (arg: InputRenderArg) => JSX.Element;
};

export function defineInput<T extends Component>(options: Options<T>) {
  return options;
}

export class Inputer<T extends Record<string, any>> {
  map: T;

  constructor(map: T) {
    this.map = map;
  }

  init(arg: inputInitArg) {
    defaultsDeep(arg.props, this.map[arg.item.type]?.props);
    this.map[arg.item.type]?.init?.(arg);
  }

  getRender(type: string) {
    return this.map[type]?.render;
  }

  render(arg: InputRenderArg) {
    return this.map[arg.item.type].render(arg);
  }
}
