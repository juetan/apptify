import { FieldRule } from '@arco-design/web-vue';
import { has } from 'lodash';

const itemRendKeys = ['render', 'labelRender', 'helpRender', 'extraRender'];
const itemSlotKeys = ['slotName', 'labelSlotName', 'helpSlotName', 'extraSlotName'];
export const itemOmitKeys = ['type', 'required', 'visible', 'disabled', ...itemSlotKeys, ...itemRendKeys];

export const getSlots = ({ item, getForm }: any) => {
  return itemSlotKeys.reduce<any>((slots, slotname) => {
    if (item[slotname]) {
      const name = slotname === 'slotName' ? 'default' : slotname.slice(0, -4);
      slots[name] = (arg: any) => getForm().$slots[slotname]?.(arg);
    }
    return slots;
  }, {});
};

export const getRenders = ({ item }: any) => {
  return itemRendKeys.reduce<any>((slots, slotname) => {
    if (item[slotname]) {
      slots[slotname] = (arg: any) => item[slotname]?.(arg);
    }
    return slots;
  }, {});
};

const Rule: Record<string, FieldRule> = {
  required: {
    required: true,
    message: '该项为必填项',
  },
};

export const getRules = (item: any) => {
  const rules: FieldRule[] = [];

  if (item.required) {
    rules.push(Rule.required);
  }

  if (!Array.isArray(item.rules)) {
    return rules;
  }

  item.rules.forEach((rule: any) => {
    if (typeof rule !== 'string') return;
    rules.push(Rule[rule]);
  });

  return rules;
};

export const bool = (item: Record<string, any>, key: string, ...args: any[]) => {
  if (!has(item, key)) {
    return true;
  }
  if (typeof item[key] === 'function') {
    return item[key](...args);
  }
  return Boolean(item[key]);
};
