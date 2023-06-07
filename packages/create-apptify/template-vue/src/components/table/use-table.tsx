import { Button, Link, Message, Modal, TableColumnData } from "@arco-design/web-vue";
import { IconRefresh, IconSearch } from "@arco-design/web-vue/es/icon";
import { defaultsDeep, isArray, isFunction, mergeWith, omit } from "lodash-es";
import { reactive } from "vue";
import { TableInstance } from "./table";
import {
  TABLE_ACTION_DEFAULTS,
  TABLE_COLUMN_DEFAULTS,
  TABLE_DELTE_DEFAULTS,
  TALBE_INDEX_DEFAULTS,
} from "./table.config";
import { UseTableOptions } from "./use-interface";

const merge = (...args: any[]) => {
  return mergeWith({}, ...args, (obj: any, src: any) => {
    if (Array.isArray(obj) && Array.isArray(src)) {
      return obj.concat(src);
    }
    return undefined;
  });
};

/**
 * 提供便捷语法，构建传给Table组件的参数
 * @see src/components/table/use-table.tsx
 */
export const useTable = (optionsOrFn: UseTableOptions | (() => UseTableOptions)): any => {
  const options: UseTableOptions = typeof optionsOrFn === "function" ? optionsOrFn() : optionsOrFn;
  const columns: TableColumnData[] = [];

  const getTable = (): TableInstance => (columns as any).instance;

  options.columns.forEach((column) => {
    // 序号
    if (column.type === "index") {
      defaultsDeep(column, TALBE_INDEX_DEFAULTS);
    }

    // 操作
    if (column.type === "button" && isArray(column.buttons)) {
      if (options.detail) {
        column.buttons.unshift({
          text: "详情",
          onClick: (data) => {},
        });
      }

      if (options.modify) {
        const modifyAction = column.buttons.find((i) => i.type === "modify");
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

        if (action.type === "delete") {
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

        return { ...TABLE_ACTION_DEFAULTS, ...action, onClick } as any;
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

  const itemsMap = options.common?.items?.reduce((map, item) => {
    map[item.field] = item;
    return map;
  }, {} as any);

  /**
   * 搜索表单的处理
   */
  if (options.search && options.search.items) {
    const searchItems: any[] = [];
    options.search.items.forEach((item) => {
      if (typeof item === "string") {
        if (!itemsMap[item]) {
          throw new Error(`search item ${item} not found in common items`);
        }
        searchItems.push(itemsMap[item]);
        return;
      }
      if ("extend" in item && item.extend && itemsMap[item.extend]) {
        searchItems.push(merge({}, itemsMap[item.extend], item));
        return;
      }
      searchItems.push(item);
    });
    searchItems.push({
      field: "id",
      type: "custom",
      itemProps: {
        class: "table-search-item col-start-4 !mr-0 grid grid-cols-[0_1fr]",
        hideLabel: true,
      },
      component: () => {
        const tableRef = inject<any>("ref:table");
        console.log("ii", tableRef);
        return (
          <div class="w-full flex gap-x-2 justify-end">
            {(options.search?.items?.length || 0) > 3 && (
              <Button disabled={tableRef?.loading.value} onClick={() => tableRef?.reloadData()}>
                {{ icon: () => <IconRefresh></IconRefresh>, default: () => "重置" }}
              </Button>
            )}
            <Button type="primary" loading={tableRef?.loading.value} onClick={() => tableRef?.loadData()}>
              {{ icon: () => <IconSearch></IconSearch>, default: () => "查询" }}
            </Button>
          </div>
        );
      },
    });
    options.search.items = searchItems;
  }

  if (options.create) {
    options.create = merge(options.common, options.create);
  }

  if (options.modify) {
    options.modify = merge(options.common, options.modify);
  }

  return reactive({ ...options, columns });
};
