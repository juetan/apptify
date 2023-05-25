<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <div class="flex gap-2 items-center">
      <div>
        <img src="@/assets/404.svg" alt="404" class="w-[320px]">
      </div>
      <div>
        <h2 class="text-3xl m-0 font-bold">404</h2>
        <p class="mt-2">页面未找到，你访问的地址不存在!</p>
        <div class="space-x-3 mt-6">
          <a-button type="primary" @click="router.back()">
            <template #icon>
              <i class="icon-park-outline-back"></i>
            </template>
            返回
          </a-button>
          <a-button type="outline" @click="router.push('/')">
            <template #icon>
              <i class="icon-park-outline-home"></i>
            </template>
            首页
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped></style>

<route lang="json">
{
  "meta": {
    "title": "404",
    "icon": "icon-park-outline-home"
  }
}
</route>
