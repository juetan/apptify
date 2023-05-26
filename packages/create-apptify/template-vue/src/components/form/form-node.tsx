import { Button, Input, InputNumber, InputPassword, Select } from "@arco-design/web-vue";

/**
 * 表单项组件映射
 */
export const nodeMap = {
  /**
   * 输入框
   */
  input: {
    component: Input,
    initialProps: {
      placeholder: "请输入",
      allowClear: true,
    } as InstanceType<typeof Input>["$props"],
  },
  /**
   * 数值输入框
   */
  number: {
    component: InputNumber,
    initialProps: {
      placeholder: "请输入",
      defaultValue: 0,
      allowClear: true,
    } as InstanceType<typeof InputNumber>["$props"],
  },
  /**
   * 密码输入框
   */
  password: {
    component: InputPassword,
    initialProps: {
      placeholder: "请输入",
    } as InstanceType<typeof InputPassword>["$props"],
  },
  /**
   * 选择框
   */
  select: {
    component: Select,
    initialProps: {
      placeholder: "请选择",
      allowClear: true,
      allowSearch: true,
      options: [],
    } as InstanceType<typeof Select>["$props"],
    init({ item, model }: any) {
      if (Array.isArray(item.options)) {
        item.inputProps.options = item.options;
        return;
      }
      if (typeof item.options !== "function") {
        return;
      }
      item.inputProps.options = reactive([]);
      const fetchData = item.options;
      item._updateOptions = async () => {
        let data = await fetchData({ item, model });
        if (Array.isArray(data?.data)) {
          data = data.data.map(({ id: value, name: label }: any) => ({ label, value }));
        }
        if (Array.isArray(data)) {
          item.inputProps.options.splice(0);
          item.inputProps.options.push(...data);
        }
      };
      item._updateOptions();
    },
  },
  /**
   * 底部
   */
  submit: {
    initialProps: {},
    component: (props: any, { emit }: any) => {
      return (
        <>
          <Button type="primary" loading={props.loading} onClick={() => emit("submit")} class="mr-3">
            立即提交
          </Button>
          {/* <Button loading={props.loading} onClick={() => emit("cancel")}>
            重置
          </Button> */}
        </>
      );
    },
  },
  /**
   * 自定义组件
   */
  custom: {
    initialProps: {},
    component: () => null,
  },
};

/**
 * 所有组件类型
 */
export type NodeMap = typeof nodeMap;

/**
 * 组件类型
 */
export type NodeType = keyof NodeMap;

/**
 * 提供给`FormItem`的联合类型
 * @description 当输入type，nodeProps会提供对应类型提示
 */
export type NodeUnion = {
  [key in NodeType]: {
    /**
     * 输入框类型，默认为`input`
     */
    type: key;
    /**
     * 传递给`type`属性对应组件的参数
     */
    nodeProps?: NodeMap[key]["initialProps"];
  };
}[NodeType];
