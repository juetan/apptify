<template>
  <div class="m-4 p-4 bg-white">
    <div class="mt-3">
      <a-button type="primary" @click="appStore.increment()">增加+1</a-button>
      {{ appStore.count }}
      {{ dayjs().from("2023-03-31 09:08:12") }} -
      {{ dayjs("2022-11-10 01:02:03", dayjs.DATETIME).format() }}
    </div>
    <a-table :columns="columns" :data="users" class="mt-4"></a-table>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/api";
import { dayjs } from "@/plugins";
import { useAppStore } from "@/store";
import { User } from "@app/api/service";
import { TableColumnData } from "@arco-design/web-vue";

const appStore = useAppStore();

const columns: TableColumnData[] = [
  {
    title: "姓名",
    dataIndex: "username",
  },
  {
    title: '昵称',
    dataIndex: 'nickname'
  }
];

const users = ref<User[]>([]);

onMounted(async () => {
  const res: any = await api.api.selectUsers();
  users.value = res.data;
});
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
