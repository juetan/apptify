<template>
  <div class="page-login w-full h-full flex items-center justify-center bg-slate-200">
    <dvi class="bg fixed w-full h-full"></dvi>
    <div class="fixed flex items-center justify-between top-0 m-0 h-13 w-full px-10 z-10">
      <!-- <div class="flex items-center">
        <img src="/favicon.ico" alt="" width="20" height="20" class="mr-1" />
        <h1 class="text-lg m-0">
          {{ appStore.title }}
          <span class="mx-1 text-slate-500">|</span>
          <span class="text-slate-500 font-normal text-sm">{{ appStore.subtitle }}</span>
        </h1>
      </div>
      <div>敬请期待</div> -->
    </div>
    <div class="relative mx:2 grid  md:grid-cols-[1fr_500px] rounded overflow-hidden w-[1020px] h-[600px] shadow">
      <div class="relative hidden md:block w-full h-full overflow-hidden bg-gradient-to-br from-[#7af] to-[#09f] px-4">
        <img src="@/assets/td.svg" :alt="appStore.title" class="w-full h-full" />
      </div>
      <div class="relative p-20 px-14 bg-white shadow-sm rounded">
        <div class="text-2xl">欢迎登陆</div>
        <div class="text-base text-gray-500 mt-3">{{ meridiem }}好，欢迎登陆{{ appStore.title }}!</div>
        <a-form ref="loginForm" :model="model" layout="vertical" class="mt-8">
          <a-form-item field="username" label="账号" hide-asterisk>
            <a-input v-model="model.username" placeholder="请输入账号/手机号/邮箱" allow-clear>
              <template #prefix>
                <i class="icon-park-outline-user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" label="密码" hide-asterisk>
            <a-input-password v-model="model.password" placeholder="请输入密码" allow-clear>
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
            <a-button type="primary" html-type="submit" long class="mt-2" @click="onSubmitClick"> 立即登录 </a-button>
            <p type="text" long class="text-gray-400 text-center m-0">暂不支持其他方式登录</p>
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
const model = reactive({ username: "", password: "" });
const router = useRouter();

const onForgetPasswordClick = () => {
  Modal.info({
    title: "忘记密码?",
    content: "如已忘记密码，请联系管理员进行密码重置!",
    modalClass: "text-center",
    maskClosable: false,
  });
};

const onSubmitClick = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  router.push({ path: "/" });
};
</script>

<style lang="less" scoped>
.page-login .bg {
  background-image: url(@/assets/wave.svg);
  filter: opacity(0.2);
  background-color: #c9e5fc;
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
