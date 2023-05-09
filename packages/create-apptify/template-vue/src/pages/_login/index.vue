<template>
  <div
    class="page-login w-full h-full flex items-center justify-center bg-slate-100"
  >
    <div
      class="grid grid-cols-2 bg-white rounded overflow-hidden w-[1080px] h-[600px] shadow"
    >
      <div class="w-full h-full overflow-hidden bg-gray-50">
        <img
          src="https://images.unsplash.com/photo-1443131307017-4097c8ac7763?dpr=2&auto=format&fit=crop&w=1500&h=1909&q=80&cs=tinysrgb"
          :alt="appStore.title"
          class="w-full h-full opacity-80"
        />
      </div>
      <div class="w-full p-24">
        <div class="text-2xl">欢迎登陆</div>
        <div class="text-base text-gray-500 mt-2">
          {{ meridiem }}好，欢迎登陆{{ appStore.title }}!
        </div>
        <a-form ref="loginForm" :model="model" layout="vertical" class="mt-8">
          <a-form-item field="username" label="账号" hide-asterisk>
            <a-input
              v-model="model.username"
              placeholder="请输入账号/手机号/邮箱"
              allow-clear
            >
              <template #prefix>
                <i class="icon-park-outline-user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" label="密码" hide-asterisk>
            <a-input-password
              v-model="model.password"
              placeholder="请输入密码"
              allow-clear
            >
              <template #prefix>
                <i class="icon-park-outline-lock" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="flex items-center justify-between">
              <a-checkbox checked="rememberPassword">记住我</a-checkbox>
              <a-link @click="onForgetPasswordClick">忘记密码?</a-link>
            </div>
            <a-button type="primary" html-type="submit" long class="mt-2">
              立即登录
            </a-button>
            <p type="text" long class="text-gray-400 text-center m-0">
              暂不支持其他方式登录
            </p>
          </a-space>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dayjs } from "@/plugins";
import { useAppStore } from "@/store";
import { Modal } from "@arco-design/web-vue";
import { reactive } from "vue";

const meridiem = dayjs.localeData().meridiem(dayjs().hour(), dayjs().minute());
const appStore = useAppStore();
const model = reactive({
  username: "",
  password: "",
});

const onForgetPasswordClick = () => {
  Modal.info({
    title: "忘记密码?",
    content: "如已忘记密码，请联系管理员进行密码重置!",
    modalClass: "text-center",
    maskClosable: false,
  });
};
</script>

<style lang="less" scoped>
.page-login {
  background-image: url(@/assets/wave.svg);
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
