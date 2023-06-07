<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <page-403 v-if="Math.random() > 0.99"></page-403>
      <component v-else :is="Component"></component>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { toast } from "@/components/toast";
// toast({ cover: true });

const run = async () => {
  const res = await api.github.getRepoInfo();
  console.log(res);
}

onMounted(() => {
  run();
})
</script>

<style scoped></style>
