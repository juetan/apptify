<template>
  <AForm ref="FormRef" :model="model" v-bind="formProps">
    <FormItem v-for="item in innerItems" :key="item.field" :item="item" :model="model" :slots="$slots"></FormItem>
    <AFormItem v-if="actions?.length" style="display: flex; gap: 8px">
      <AButton
        v-for="action in actions"
        v-bind="action.buttonProps"
        :key="action.label"
        :loading="loading"
        @click="onActionClick(action)"
      >
        {{ action.label }}
      </AButton>
    </AFormItem>
  </AForm>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';
import { Form as AForm, FormItem as AFormItem, Button as AButton } from '@arco-design/web-vue';
import { IFormItem } from './interface';
import FormItem from './form-item.vue';



export default defineComponent({
  name: 'Form',
  components: {
    AForm,
    AFormItem,
    AButton,
    FormItem,
  },
  props: {
    /**
     * 表单数据
     * @description 默认根据表单项中的field和defaultValue生成，传入值将会合并默认值
     */
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    /**
     * 表单项
     * @description 传入表单项数组，每一项为一个表单项，具体配置参考BhFormItemProps
     */
    items: {
      type: Array as PropType<IFormItem[]>,
      required: true,
    },
    /**
     * 表单操作
     * @description
     */
    actions: {
      type: Array as PropType<any>,
    },
    /**
     * 提交表单
     *  @description
     */
    submit: {
      type: Function as PropType<(model: Record<string, any>, items: IFormItem[]) => Promise<any>>,
    },
    /**
     * 表单额外Props
     */
    formProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  computed: {
    innerItems(): IFormItem[] {
      return this.items.filter((item) => {
        if (typeof item.visible === 'function') {
          return item.visible(this.model, item, this.items);
        }
        return true;
      });
    },
  },
  setup(props, { attrs }) {
    const loading = ref(false);
    const FormRef = ref<InstanceType<typeof AForm>>();

    const formProps = computed(() => {
      return { ...props.formProps, ...attrs };
    });

    return { formProps, loading, FormRef };
  },
  methods: {
    async onActionClick(action: any) {
      if (action.type === 'submit') {
        await this.FormRef?.validate();
        this.loading = true;
        this.submit?.(this.model, this.items).finally(() => {
          this.loading = false;
        });
      }
      if (action.type === 'reset') {
        Object.assign(this.model, {});
      }
    },

    getFormRef() {
      return this.$refs.FormRef;
    },

    getFormItemRef(field: string) {
      return this.$refs.FormRef;
    },
  },
});
</script>

<style lang="scss" scoped></style>
