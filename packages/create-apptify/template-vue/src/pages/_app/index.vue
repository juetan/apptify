<template>
  <a-layout class="layout">
    <a-layout-header
      class="h-13 overflow-hidden flex justify-between items-center gap-4 px-4 border-b border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700"
    >
      <div
        class="h-13 flex items-center border-b border-slate-200 dark:border-slate-800"
      >
        <router-link to="/" class="ml-1 flex items-center gap-1 text-slate-700">
          <img src="/favicon.ico" alt="" width="20" height="20" />
          <h1 class="text-lg leading-[18px] dark:text-white m-0 p-0 font-bold text-[#09f]">
            {{ appStore.title }}
          </h1>
        </router-link>
      </div>
      <div class="flex items-center gap-4">
        <a-tooltip
          v-for="btn in buttons"
          :key="btn.icon"
          :content="btn.tooltip"
        >
          <a-button shape="round" @click="btn.onClick">
            <template #icon>
              <i :class="btn.icon"></i>
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown>
          <span class="cursor-pointer">
            <a-avatar :size="28">A</a-avatar>
            <span class="mx-2">admin</span>
            <i class="icon-park-outline-down"></i>
          </span>
          <template #content>
            <a-doption>
              <template #icon>
                <i class="icon-park-outline-config"></i>
              </template>
              个人设置
            </a-doption>
            <a-doption>
              <template #icon>
                <i class="icon-park-outline-logout"></i>
              </template>
              退出登录
            </a-doption>
          </template>
        </a-dropdown>
        <a-drawer
          v-model:visible="themeConfig.visible"
          title="主题设置"
          :width="280"
        ></a-drawer>
      </div>
    </a-layout-header>

    <a-layout class="flex flex-1 overflow-hidden">
      <a-layout-sider
        class="h-full overflow-hidden dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
        :width="208"
        :collapsed-width="52"
        :collapsible="true"
        :collapsed="isCollapsed"
        :hide-trigger="false"
        @collapse="onCollapse"
      >
        <div class="">
          <Menu />
        </div>
      </a-layout-sider>
      <a-layout class="layout-content flex-1">
        <a-layout-header
          class="h-8 bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700"
        >
          <div class="h-full flex items-center gap-2 px-4">
            <a-tag class="cursor-pointer">首页</a-tag>
          </div>
        </a-layout-header>
        <a-layout-content>
          <router-view v-slot="{ Component }">
            <component :is="Component"></component>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import Menu from "./components/menu.vue";

const appStore = useAppStore();
const isCollapsed = ref(false);
const themeConfig = ref({
  visible: false,
});

const onCollapse = (val: boolean) => {
  isCollapsed.value = val;
};

const buttons = [
  {
    icon: "icon-park-outline-moon",
    tooltip: "点击切换主题色",
    onClick: () => {
      appStore.toggleDark();
    },
  },
  {
    icon: "icon-park-outline-config",
    tooltip: "点击打开设置",
    onClick: () => {
      themeConfig.value.visible = true;
    },
  },
];
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  display: flex;
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
    "title": "首页",
    "icon": "icon-park-outline-home"
  }
}
</route>
