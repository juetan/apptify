<template>
  <AFormItem :label="item.label" :disabled="item.disabled?.(model, item, [])" v-bind="item.itemProps">
    <template v-for="slotname in slotnames" #[slotname] :key="slotname">
      <SlotRender :render="slots[slotname]" :item="item" :model="model"></SlotRender>
    </template>
    <template v-if="item.slotname">
      {{ slots[item.slotname]() }}
    </template>
    <component v-else :is="`a-${item.type}`" v-model="model[item.field]" v-bind="item.nodeProps"></component>
  </AFormItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormItem as AFormItem } from '@arco-design/web-vue';
import { PropType } from 'vue';
import { IFormItem } from './interface';
import { NodeComponents } from './form-node';

const SlotRender = ({ render, ...props }: any) => {
  return render(props);
};

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IFormItem>,
      required: true,
    },
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    slots: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
  },
  components: {
    ...NodeComponents,
    AFormItem,
    SlotRender,
  },
  setup(props) {
    const { label, help, extra } = props.item;
    const slotnames = [label, help, extra]
      .filter((item) => item?.startsWith('slot:'))
      .map((i) => i?.replace('slot:', '')) as string[];

    console.log(slotnames);
    return {
      slotnames,
    };
  },
  mounted() {
    console.log(this.slots);
  },
});
</script>

<style scoped></style>
