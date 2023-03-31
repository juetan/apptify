import { has, isFunction } from 'lodash';
import { BhItemDisabled, BhItemVisibled } from './interface';

/** 是否可见 */
export const isVisibled: BhItemVisibled = (arg) => {
  const { item } = arg;
  if (!has(item, 'visible')) {
    return true;
  }
  if (isFunction(item.visible)) {
    return item.visible(arg);
  }
  return Boolean(item.visible);
};

export const isDisabled: BhItemDisabled = (arg) => {
  const { item } = arg;
  if (!has(item, 'disabled')) {
    return false;
  }
  if (isFunction(item.disabled)) {
    return item.disabled(arg);
  }
  return Boolean(item.disabled);
};
