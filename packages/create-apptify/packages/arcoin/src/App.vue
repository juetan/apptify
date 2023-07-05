<script setup lang="ts">
import { AnForm, useAnForm } from './ui/form';

const form = useAnForm({
  formProps: {
    layout: 'vertical',
  },
  items: [
    {
      field: 'tod',
      value: '10',
      type: 'input',
      label: 'slot:todo',
      required: true,
      slotname: 'todo',
      itemProps: {},
      nodeProps: {
        type: 'text',
      },
    },
    {
      field: 'to1d',
      value: 110,
      label: '名称',
      type: 'number',
      visible: (model) => model.tod === 'changed',
      nodeProps: {
        min: 0,
      },
    },
  ],
  actions: [
    {
      type: 'submit',
      label: '提交表单',
    },
    {
      type: 'reset',
    },
  ],
  submit: async (model) => {
    const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
    await delay(2000);
    console.log('model', model);
  },
});
console.log(form);
const changeModel = () => {
  form.model.tod = 'changed';
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <AnForm v-bind="form" style="width: 880px; margin: 0 auto">
    <template #todo>
      <span>11</span>
    </template>
  </AnForm>
  <button @click="changeModel">修改表单值</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
