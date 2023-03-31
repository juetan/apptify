<template>
  <Form ref="FormRef" model="{this.model}" {...this.$attrs}>
    {items.map((item) => (
    <BhFormItem item="{item}" {...props}></BhFormItem>
    ))}
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { BhFormItem as IFormItem, BhFormModel } from './interface';

export default defineComponent({
  name: 'Form',
  props: {
    /**
     * 表单项
     * @description 传入表单项数组，每一项为一个表单项，具体配置参考BhFormItemProps
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },

    /**
     * 表单数据
     * @description 默认根据表单项中的field和defaultValue生成，传入值将会合并默认值
     */
    model: {
      type: Object as PropType<BhFormModel>,
      default: () => ({}),
    },

    /**
     * 表单底部
     * @description 默认为提交按钮，传入false则不显示，传入element则显示传入的element
     */
    footer: {
      type: [Boolean, () => Element],
    },
  },
  setup(props) {
    const FormRef = ref<FormInstance>();

    props.items.forEach((item) => {
      const args = { props: item.inputProps, item, model: props.model };
      if (!item.inputProps) item.inputProps = {};
      inputer.init(args);
      Object.assign(props.model, { [item.field]: item.defaultValue });
    });

    const getItem = (field: string) => props.items.find((item) => item.field === field);

    const updateOptions = (field: string) => getItem(field)?._updateOptions?.();

    return {
      FormRef,
      updateOptions,
    };
  },
  methods: {
    /**
     * 获取表单项
     * @description 获取表单，如果传入field则获取指定表单项
     */
    getItem(field: string) {
      return this.items.find((item) => item.field === field);
    },
  },
});
</script>

<style lang="scss" scoped></style>
