import { FormItem } from "@arco-design/web-vue";
import { omit } from "lodash-es";
import { bool } from "../form/type";
import { isDisabled } from "../helper";
import { BhFormItemProps } from "../interface";

export const BhFormItem = (props: BhFormItemProps) => {
  const { item } = props;
  const args = { ...props, field: item.field, props: item.inputProps };
  const rules = item.rules?.filter((i) => bool(i, "when", args));

  return (
    <FormItem {...omit(item, ["rules", "render", "inputProps"])} rules={rules} disabled={isDisabled(args)}>
      {{
        default: () => item.render?.(args),
        labelRender: item.labelRender && (() => item.labelRender?.(args)),
        helpRender: item.helpRender && (() => item.helpRender?.(args)),
        extraRender: item.extraRender && (() => item.extraRender?.(args)),
      }}
    </FormItem>
  );
};
