import { reactive } from 'vue';
import { NodeMap } from './form-node';
import { IOptions, IFormItem } from './interface.d';

export function useForm(options: IOptions) {
  const { model = {} } = options;
  const items: IFormItem[] = [];

  options.items.forEach((item) => {
    if (!item.nodeProps) {
      item.nodeProps = {};
    }
    if (!item.itemProps) {
      item.itemProps = {};
    }

    item.itemProps.field = item.field;

    model[item.field] = model[item.field] || item.value;

    if (item.required) {
      item.itemProps.rules = item.rules || [];
      item.itemProps.rules.push({
        required: true,
        message: `该项不能为空`,
      });
    }

    items.push({
      ...item,
      nodeProps: { ...NodeMap?.[item.type]?.defaultProps, ...item.nodeProps } as any,
    });
  });

  options.actions?.forEach((action) => {
    if (!action.buttonProps) {
      action.buttonProps = {};
    }
    if (action.type === 'submit') {
      action.buttonProps.onClick = () => {
        options.submit?.(model, items);
      };
    }
    if (action.type === 'reset') {
      action.label = action.label || '重置';
      action.buttonProps.type = '';
      action.buttonProps.onClick = () => {
        items.forEach((item) => {
          model[item.field] = item.value;
        });
      };
    }
    if (action.buttonProps.type === undefined) {
      action.buttonProps.type = 'primary';
    }
  });

  return reactive({ ...options, model, items });
}
