import { useDark as _useDark } from '@vueuse/core';

const isDark = _useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

export const useDark = () => {
  return isDark;
};
