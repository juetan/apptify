<template>
  <div class="p-4">
    <div>
      {{ appStore.count }}
      <a-button type="primary" @click="appStore.increment()">增加+1</a-button>
    </div>
    <div>
      {{ dayjs().from('2023-03-31 09:08:12') }} - {{ dayjs('2022-11-10 01:02:03', dayjs.DATETIME).format() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { dayjs } from '@/plugins';

const appStore = useAppStore();
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10101,
    "title": "首页",
    "icon": "icon-park-outline-home"
  }
}
</route>
