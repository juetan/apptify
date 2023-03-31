import { Button, ButtonInstance, FormInstance, Modal } from '@arco-design/web-vue';
import { defaultsDeep, isBoolean, isFunction, isObject, omit } from 'lodash';
import { defineComponent, PropType, reactive } from 'vue';
import { BhForm, BhFormInstance } from '../form';
import { BhFormAction, BhFormItem, BhFormModel } from '../interface';

const omitKeys = ['visible', 'onBeforeOk', 'width', 'okLoading'];

export const BhFormModal = defineComponent({
  name: 'BhFormModal',
  inheritAttrs: false,
  props: {
    /** 触发元素 */
    trigger: {
      type: [Boolean, Object] as PropType<boolean | (ButtonInstance['$props'] & { text: string })>,
      default: true,
    },

    /** 表单数据 */
    model: {
      type: Object as PropType<BhFormModel>,
      default: () => reactive({}),
    },

    /** 表单各项 */
    items: {
      type: Array as PropType<BhFormItem[]>,
      required: true,
    },

    /** 提交函数 */
    submit: {
      type: Function as PropType<BhFormAction>,
      default: () => true,
    },

    /** 透传给Form组件的props */
    formProps: {
      type: Object as PropType<Omit<FormInstance['$props'], 'model'>>,
    },
  },
  data() {
    return {
      FormRef: {} as BhFormInstance,
      loading: false,
      visible: false,
    };
  },
  methods: {
    // 打开弹窗
    open(data = {}) {
      this.visible = true;
      this.$nextTick(() => defaultsDeep(this.model, data));
    },

    // 提交表单
    async onBeforeOk() {
      if (isFunction(this.$attrs.onBeforeOk)) {
        const isOk = await this.$attrs.onBeforeOk();
        if (isOk === false) return false;
      }

      const errors = await this.FormRef.FormRef?.validate();
      if (errors) {
        return false;
      }

      await this.submit?.({ items: this.items, model: this.model });
      return true;
    },

    // 获取数据
    getModel() {
      return this.FormRef?.model;
    },
  },
  render() {
    const Trigger = () => {
      if (!this.trigger) {
        return null;
      }

      let content;
      if (isBoolean(this.trigger)) {
        content = <Button type="primary">立即新建</Button>;
      }
      if (isObject(this.trigger)) {
        content = (
          <Button type="primary" {...omit(this.trigger, 'text')}>
            {this.trigger?.text || '立即新建'}
          </Button>
        );
      }
      if (this.$slots.trigger) {
        content = this.$slots.trigger;
      }

      return <span onClick={() => this.open()}>{content}</span>;
    };

    return (
      <span>
        <Trigger></Trigger>
        <Modal
          v-model:visible={this.visible}
          onBeforeOk={this.onBeforeOk}
          width={(this.$attrs.width as string) || '1280px'}
          {...omit(this.$attrs, omitKeys)}
        >
          {this.visible && (
            <BhForm ref={(el: any) => (this.FormRef = el)} model={this.model} items={this.items} {...this.formProps}>
              {{ ...this.$slots }}
            </BhForm>
          )}
        </Modal>
      </span>
    );
  },
});

export type BhFormModalInstance = InstanceType<typeof BhFormModal>;

export type BhFormModalProps = BhFormModalInstance['$props'] & InstanceType<typeof Modal>['$props'];
