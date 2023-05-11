import { useForm } from "@/ui/form/form/use-form";
import { Button, Link, Message, Modal } from "@arco-design/web-vue";
import { IconRefresh, IconSearch } from "@arco-design/web-vue/es/icon";
import { defaultsDeep, isArray, isFunction, isObject, isString, mergeWith, omit } from "lodash-es";
import { reactive } from "vue";
import { BhTable, BhTableColumn, BhTableProps } from "../table";
import { USE_ACTION, USE_COLUMN, USE_DELETE, USE_INDEX, USE_MODULE, USE_SEARCH } from "./config";
import { UseTableOptions } from "./type";

/** 构建1个传给BhTable组件的参数 */
export const useTable = (options: UseTableOptions): BhTableProps => {
  const columns: BhTableColumn[] = [];

  const _search = USE_MODULE(options.search);
  const _create = USE_MODULE(options.create);
  const _modify = USE_MODULE(options.modify);
  const _detail = USE_MODULE(options.detail);

  const getTable = (): InstanceType<typeof BhTable> => (columns as any)?.instance;

  options.columns.forEach((column) => {
    const label = isString(column.title) ? column.title : "";
    const field = column.dataIndex || "";
    const opt = { label, field, type: "input", ...(column.common as object) };
    const item = (i: any) => ({ ...opt, ...(isObject(i) && i) });

    // 搜索
    if (_search && column.search) {
      _search.items.push(item(column.search));
    }
    // 新建
    if (_create && column.create) {
      _create.items.push(item(column.create));
    }
    // 修改
    if (_modify && column.modify) {
      _modify.items.push(item(column.modify));
    }
    // 详情
    if (_detail && column.detail) {
      _detail.items.push(item(column.detail as any));
    }
    // 序号
    if (column.type === "index") {
      defaultsDeep(column, USE_INDEX, {
        render: ({ record }: any) => {
          const { current, pageSize } = getTable().pagination;
          return (current - 1) * pageSize + record.index + 1;
        },
      });
    }
    // 操作
    if (column.type === "action" && isArray(column.action)) {
      if (_detail) {
        column.action.unshift({
          text: "详情",
          onClick: (data) => {},
        });
      }

      if (_modify) {
        const modifyAction = column.action.find((i) => i.action === "modify");
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
          column.action.unshift({
            text: "修改",
            onClick: (data) => getTable()?.openModifyModal(data),
          });
        }
      }

      column.action = column.action?.map((action) => {
        let onClick = action?.onClick;

        if (action.action === "delete") {
          onClick = (data) => {
            Modal.warning({
              ...USE_DELETE,
              onOk: async () => {
                const resData = await action?.api?.(data);
                Message.success(resData.msg || "");
                getTable()?.loadData();
              },
            });
          };
        }

        return { ...USE_ACTION, ...action, onClick };
      });

      column.render = (columnData) =>
        column.action?.map((action) => {
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

    const col = omit(column, ["create", "modify", "detail", "search"]);

    columns.push({ ...USE_COLUMN, ...col } as any);
  });

  if (_search) {
    _search.items.push({
      class: "col-start-4 mr-0 grid grid-cols-[0_1fr]",
      render: () => (
        <div class="w-full flex justify-end">
          {_search?.items?.length > 4 && (
            <Button disabled={getTable().loading} onClick={() => getTable().reloadData()}>
              {{ icon: () => <IconRefresh></IconRefresh>, default: () => "重置" }}
            </Button>
          )}
          <Button
            type="primary"
            loading={getTable().loading}
            onClick={() => getTable().loadData()}
            class={_search?.items.length > 4 && "ml-2"}
          >
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

  const search = _search && useForm(merge({}, USE_SEARCH, _search));
  const create = _create && useForm(merge({}, options.common || {}, _create));
  const modify = _modify && useForm(merge({}, options.common || {}, { trigger: false }, _modify));
  const detail = _detail && { ...options.common, ..._detail };

  return reactive({ ...options, columns, search, create, modify, detail }) as any;
};
