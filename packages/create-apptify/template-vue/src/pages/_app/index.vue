<template>
  <a-layout class="layout">
    <a-layout-header class="flex justify-between items-center gap-4 px-6 border-b border-slate-200">
      <router-link to="/" class="flex items-center gap-3 text-slate-700">
        <img src="/favicon.ico" alt="" width="28" height="28" />
        <h1 class="text-base font-normal">
          {{ appTitle }}
        </h1>
      </router-link>
      <div class="space-x-2">
        <a-tooltip v-for="btn in buttons" :key="btn.icon" :content="btn.tooltip">
          <a-button shape="round" @click="btn.onClick">
            <template #icon>
              <i :class="btn.icon"></i>
            </template>
          </a-button>
        </a-tooltip>
      </div>
    </a-layout-header>
    <a-layout class="flex">
      <a-layout-sider class="layout-sider" breakpoint="xl" :collapsible="true" :hide-trigger="true">
        <div class="menu-wrapper">
          <Menu />
        </div>
      </a-layout-sider>
      <a-layout class="layout-content flex-1">
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Menu from './components/menu.vue';

const appTitle = import.meta.env.VITE_APP_TITLE;

const buttons = [
  {
    icon: 'icon-park-outline-moon',
    tooltip: '点击切换主题色',
    onClick: () => {
      console.log('click');
    },
  },
  {
    icon: 'icon-park-outline-config',
    tooltip: '点击打开设置',
    onClick: () => {
      console.log('click');
    },
  },
];
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  display: grid;
  grid-template-rows: 52px 1fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}
.layout-sider {
  z-index: 99;
  height: 100%;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }
  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}
.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }
    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>

<route lang="json">
{
  "meta": {
    "sort": 101,
    "title": "登录",
    "icon": "icon-park-outline-home"
  }
}
</route>
