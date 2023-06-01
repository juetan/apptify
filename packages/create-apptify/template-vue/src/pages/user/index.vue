<template>
  <BreadPage>
    <Table v-bind="table"></Table>
  </BreadPage>
</template>

<script setup lang="tsx">

const table = useTable({
  api: async (model, paging) => api.user.selectUsers({ ...paging, ...model }),
  columns: [
    {
      title: "姓名",
      dataIndex: "username",
      width: 200,
    },
    {
      title: "昵称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 200,
    },
    {
      title: "操作",
      type: "buttons",
      width: 70,
      buttons: [
        {
          action: "modify",
          text: '修改',
        }
      ],
    },
  ],
  common: {
    modalProps: {
      width: 772,
      maskClosable: false,
    },
    formProps: {
      layout: "vertical",
      class: "!grid grid-cols-2 gap-x-3",
    },
    model: {
      avatarUrl: "",
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
      {
        field: "description",
        label: "个人描述",
        type: "input",
      },
      {
        field: "password",
        label: "密码",
        type: "password",
      },
      {
        label: "头像",
        field: "avatar",
        type: "input",
        itemProps: {
          class: "col-span-2",
        },
        contentRender: ({ model, field }) => {
          const onInputChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) {
              return;
            }
            model[field] = file;
            const reader = new FileReader();
            reader.onload = (e) => {
              model.avatarUrl = e.target?.result;
            };
            reader.readAsDataURL(file);
          };
          return (
            <div class="w-full h-12 flex gap-4 items-center justify-between">
              <input type="file" onChange={onInputChange} class="flex-1" />
              {model.avatarUrl && (
                <a-avatar size={40}>
                  <img src={model.avatarUrl} />
                </a-avatar>
              )}
            </div>
          );
        },
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
    submit: ({ model }) => {
      return api.user.createUser(model as any, {
        type: ContentType.FormData,
      });
    },
  },
  modify: {
    title: "修改用户",
    submit: ({ model }) => {
      return api.user.updateUser(model.id, model);
    },
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10301,
    "title": "用户管理",
    "icon": "icon-park-outline-user"
  }
}
</route>
