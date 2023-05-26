import { Button, Link, Message, Modal, TableColumnData } from "@arco-design/web-vue";
import { IconRefresh, IconSearch } from "@arco-design/web-vue/es/icon";
import { defaultsDeep, isArray, isFunction, mergeWith, omit } from "lodash-es";
import { reactive } from "vue";
import {
  TABLE_ACTION_DEFAULTS,
  TABLE_COLUMN_DEFAULTS,
  TABLE_DELTE_DEFAULTS,
  TALBE_INDEX_DEFAULTS,
} from "./table.config";
import { TableInstance } from "./table";
import { UseTableOptions } from "./use-interface";

/**
 * 提供便捷语法，构建传给Table组件的参数
 */
export const useTable = (optionsOrFn: UseTableOptions | (() => UseTableOptions)) => {
  const options: UseTableOptions = typeof optionsOrFn === "function" ? optionsOrFn() : optionsOrFn;
  const columns: TableColumnData[] = [];

  const getTable = (): TableInstance => (columns as any)?.getInstance?.();

  options.columns.forEach((column) => {
    // 序号
    if (column.type === "index") {
      defaultsDeep(column, TALBE_INDEX_DEFAULTS);
    }

    // 操作
    if (column.type === "buttons" && isArray(column.buttons)) {
      if (options.detail) {
        column.buttons.unshift({
          text: "详情",
          onClick: (data) => {},
        });
      }

      if (options.modify) {
        const modifyAction = column.buttons.find((i) => i.action === "modify");
        if (modifyAction) {
          const { onClick } = modifyAction;
          modifyAction.onClick = (columnData) => {
            const fn = (data: Record<string, any>) => getTable()?.openModifyModal(data);
            if (isFunction(onClick)) {
              onClick(columnData, fn);
            } else {
              fn(columnData);
            }
          };
        } else {
          column.buttons.unshift({
            text: "修改",
            onClick: (data) => getTable()?.openModifyModal(data),
          });
        }
      }

      column.buttons = column.buttons?.map((action) => {
        let onClick = action?.onClick;

        if (action.action === "delete") {
          onClick = (data) => {
            Modal.warning({
              ...TABLE_DELTE_DEFAULTS,
              onOk: async () => {
                const resData: any = await action?.onClick?.(data);
                resData.msg && Message.success(resData?.msg || "");
                getTable()?.loadData();
              },
            });
          };
        }

        return { ...TABLE_ACTION_DEFAULTS, ...action, onClick };
      });

      column.render = (columnData) =>
        column.buttons?.map((action) => {
          const onClick = () => action.onClick?.(columnData);
          const omitKeys = ["text", "render", "api", "action", "onClick", "disabled"];
          const disabled = () => action.disabled?.(columnData);
          if (action.visible && !action.visible(columnData)) {
            return null;
          }
          return (
            <Link onClick={onClick} disabled={disabled()} {...omit(action as any, omitKeys)}>
              {action.text}
            </Link>
          );
        });
    }

    columns.push({ ...TABLE_COLUMN_DEFAULTS, ...column });
  });

  if (options.search && options.search.items) {
    options.search.items.push({
      field: "id",
      type: "custom",
      itemProps: {
        class: "col-start-4 mr-0 grid grid-cols-[0_1fr]",
      },
      render: () => (
        <div class="w-full flex justify-end">
          <Button disabled={getTable().loading} onClick={() => getTable().reloadData()}>
            {{ icon: () => <IconRefresh></IconRefresh>, default: () => "重置" }}
          </Button>
          <Button type="primary" loading={getTable().loading} onClick={() => getTable().loadData()} class={"ml-2"}>
            {{ icon: () => <IconSearch></IconSearch>, default: () => "查询" }}
          </Button>
        </div>
      ),
    });
  }

  const merge = (...args: any[]) =>
    mergeWith({}, ...args, (obj: any, src: any) => {
      if (Array.isArray(obj) && Array.isArray(src)) {
        return obj.concat(src);
      }
      return undefined;
    });

  return reactive({ ...options, columns });
};
