import { Button, ButtonInstance, FormInstance, Message, Modal } from "@arco-design/web-vue";
import { assign, cloneDeep, isBoolean, isFunction, omit } from "lodash-es";
import { PropType, defineComponent, reactive } from "vue";
import { BhForm } from "../form/index";
import { BhFormAction, BhFormItem, BhFormModel } from "../interface";

const omitKeys = ["visible", "onBeforeOk", "width", "okLoading", "title"];

export const BhFormModal = defineComponent({
  name: "BhFormModal",
  inheritAttrs: false,
  props: {
    /**
     * 弹窗标题
     */
    title: {
      type: [String, Function] as PropType<string | ((args: { model: Record<string, any>; items: any[] }) => string)>,
      default: "新建",
    },
    /**
     * 触发元素
     */
    trigger: {
      type: [Boolean, Object] as PropType<boolean | (ButtonInstance["$props"] & { text: string })>,
      default: true,
    },
    /**
     * 表单数据
     */
    model: {
      type: Object as PropType<BhFormModel>,
      default: () => reactive({}),
    },
    /**
     * 表单各项
     */
    items: {
      type: Array as PropType<BhFormItem[]>,
      required: true,
    },
    /**
     * 提交函数
     */
    submit: {
      type: Function as PropType<BhFormAction>,
      default: () => true,
    },
    /**
     * 透传给Form组件的props
     */
    formProps: {
      type: Object as PropType<Omit<FormInstance["$props"], "model">>,
    },
    /**
     * 透传给Modal组件的props
     */
    modalProps: {
      type: Object as PropType<Omit<InstanceType<typeof Modal>["$props"], "visible" | "title" | "onBeforeOk">>,
    },
  },
  emits: ["close"],
  setup(props) {
    const origin = cloneDeep(props.model);
    return {
      origin,
    };
  },
  data() {
    return {
      FormRef: {} as InstanceType<typeof BhForm>,
      loading: false,
      visible: false,
    };
  },
  methods: {
    /**
     * 打开弹窗
     */
    open(data = {}) {
      this.visible = true;
      this.$nextTick(() => assign(this.model, data));
    },

    /**
     * 提交表单
     */
    async onBeforeOk() {
      if (isFunction(this.$attrs.onBeforeOk)) {
        const isOk = await this.$attrs.onBeforeOk();
        if (!isOk) return false;
      }
      const errors = await this.FormRef.FormRef?.validate();
      if (errors) {
        return false;
      }
      try {
        const res = await this.submit?.({ items: this.items, model: this.model });
        if (res?.message) {
          Message.success(`提示: ${res.message}`);
        }
      } catch (error: any) {
        error.message && Message.error(`提示: ${error.message}`);
        return false;
      }
      return true;
    },

    /**
     * 获取数据
     */
    getModel() {
      return this.FormRef?.model;
    },

    /**
     * 关闭弹窗
     */
    onClose() {
      this.visible = false;
      assign(this.model, this.origin);
      this.$emit("close");
    },
  },
  render() {
    const Trigger = () => {
      if (!this.trigger) {
        return null;
      }
      let content;
      if (isBoolean(this.trigger)) {
        content = (
          <Button type="primary">
            {{
              default: () => "新建",
              icon: () => <i class="icon-park-outline-plus" />,
            }}
          </Button>
        );
      }
      if (typeof this.trigger === "object") {
        content = (
          <Button type="primary" {...omit(this.trigger, "text")}>
            {this.trigger?.text || "新建"}
          </Button>
        );
      }
      if (this.$slots.trigger) {
        content = this.$slots.trigger();
      }
      return <span onClick={() => this.open()}>{content}</span>;
    };

    return (
      <span>
        <Trigger></Trigger>
        <Modal
          {...omit(this.$attrs, omitKeys)}
          {...this.modalProps}
          v-model:visible={this.visible}
          onBeforeOk={this.onBeforeOk}
          onClose={this.onClose}
          title={typeof this.title === "function" ? this.title?.({ model: this.model, items: this.items }) : this.title}
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

export type BhFormModalProps = BhFormModalInstance["$props"] & Omit<InstanceType<typeof Modal>["$props"], "title">;
