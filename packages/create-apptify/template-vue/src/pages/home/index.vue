<template>
  <div class="m-4 p-4 bg-white">
    <bh-table v-bind="table"></bh-table>
  </div>
</template>

<script setup lang="tsx">
import { api } from "@/api";
import { dayjs } from "@/plugins";
import { BhTable, useTable } from "@/ui";
import { Avatar } from "@arco-design/web-vue";

const table = useTable({
  api: (model, paging) => {
    return api.v1.selectUsers({ ...paging, ...model });
  },
  columns: [
    // {
    //   type: 'index'
    // },
    {
      title: "姓名",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => {
        return (
          <div class="flex items-center gap-2 w-full">
            <div>
              <Avatar size={32}>
                <img src={record.avatar} width={32} height={32} />
              </Avatar>
            </div>
            <div class="flex-1 overflow-hidden">
              <span class="ml-0">{record.nickname}</span>
              <div class="text-xs text-gray-400 mt-1 truncate">{record.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "username",
    },
    {
      title: "昵称",
      dataIndex: "username",
      width: 200,
      render: ({ record }) => {
        return (
          <div class="">
            <span class="ml-0">{record.username}</span>
            <div class="text-xs text-gray-400 mt-1 truncate">创建于 {dayjs(record.createAt).format()}</div>
          </div>
        );
      },
    },
    {
      title: "操作",
      type: "action",
      width: 70,
      action: [],
    },
  ],
  common: {
    modalProps: {
      width: 432,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
    },
    items: [
      {
        field: "username",
        label: "姓名",
        type: "input",
        required: true,
      },
      {
        field: "nickname",
        label: "昵称",
        type: "input",
      },
    ],
  },
  search: {
    items: [
      {
        field: "username",
        label: "姓名",
        type: "input",
      },
    ],
  },
  create: {
    title: "新建用户",
  },
  modify: {
    title: "修改用户",
  },
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
