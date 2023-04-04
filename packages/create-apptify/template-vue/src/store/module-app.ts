import { defineStore } from 'pinia';
import { useDark } from '@vueuse/core';
import {} from 'unocss'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    const isDark = useDark({
      onChanged: (isDark) => {
        if (isDark) {
          document.body.setAttribute('arco-theme', 'dark');
          document.body.classList.add('dark');
          return;
        }
        document.body.setAttribute('arco-theme', 'light');
        document.body.classList.remove('dark');
      },
    });

    return {
      count: 0,
      isDark,
    };
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    toggleDark() {
      this.isDark = !this.isDark;
    },
  },
});
