<template>
  <div class="m-4 p-4 bg-white">
    <Form v-bind="form"></Form>
  </div>
</template>

<script setup lang="tsx">
import { Form, useForm } from "@/components";

const url = ref<any>(null);

const sleep = (wait: number) => new Promise((res) => setTimeout(res, wait));

const form = useForm({
  items: [
    {
      field: "username",
      label: "姓名",
      type: "input",
      nodeProps: {},
      required: true,
    },
    {
      field: "nickname",
      label: "昵称",
      type: "input",
    },
    {
      field: "password",
      label: "密码",
      type: "password",
      nodeProps: {
        class: "w-full",
      },
    },
    {
      label: "头像",
      field: "avatar",
      type: "input",
      render: ({ model, field }) => {
        const onInputChange = (e: Event) => {
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];
          if (!file) {
            return;
          }
          model[field] = file;
          console.log(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            url.value = e.target?.result;
          };
          reader.readAsDataURL(file);
        };
        return (
          <div class="w-full h-12 flex gap-4 items-center justify-between">
            <input type="file" onChange={onInputChange} class="flex-1" />
            {url.value && (
              <a-avatar size={40}>
                <img src={url.value} />
              </a-avatar>
            )}
          </div>
        );
      },
    },
  ],
  submit: async ({ model }) => {
    await sleep(3000);
    return { message: 'ok' }
  },
});
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "sort": 10101,
    "title": "首页111",
    "icon": "icon-park-outline-home"
  }
}
</route>
