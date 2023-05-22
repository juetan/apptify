import { FormItem as BaseFormItem } from "@arco-design/web-vue";
import { NodeType, nodeMap } from "./form-node";

export const FormItem = (props: any, { emit }: any) => {
  const { item } = props;
  const args = {
    ...props,
    field: item.field,
  };

  const rules = item.rules?.filter((rule: any) => {
    if (rule.when === undefined) {
      return true;
    }
    if (typeof rule.when === "function") {
      return rule.when(args);
    }
    return rule.when;
  });

  const disabled = (() => {
    if (item.disabled === undefined) {
      return false;
    }
    if (typeof item.disabled === "function") {
      return item.disabled(args);
    }
    return item.disabled;
  })();

  return (
    <BaseFormItem {...props.itemProps} rules={rules} disabled={disabled} label={item.label} field={item.field}>
      {{
        default: () => {
          if (item.render) {
            return item.render(args);
          }
          const comp = nodeMap[item.type as NodeType]?.component;
          if (item.type === "footer") {
            return <comp loading={props.loading} onSubmit={() => emit("submit")} onCancel={emit("cancel")} />;
          }
          return <comp v-model={props.model[item.field]} {...item.nodeProps} />;
        },
        labelRender: item.labelRender && (() => item.labelRender?.(args)),
        helpRender: item.helpRender && (() => item.helpRender?.(args)),
        extraRender: item.extraRender && (() => item.extraRender?.(args)),
      }}
    </BaseFormItem>
  );
};
