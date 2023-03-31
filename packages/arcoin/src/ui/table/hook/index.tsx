import { Button, Link, Message, Modal } from '@arco-design/web-vue';
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon';
import { defaultsDeep, isArray, isObject, isString, omit } from 'lodash';
import { reactive } from 'vue';
import { useForm } from '@/ui/form/form/use-form';
import { openDetailModal } from '../../detail';
import { UseTableOptions } from './type';
import { BhTable, BhTableProps, BhTableColumn } from '../table';
import { USE_SEARCH, USE_ACTION, USE_COLUMN, USE_DELETE, USE_INDEX, USE_MODULE } from './config';

/** 构建1个传给BhTable组件的参数 */
export const useTable = (options: UseTableOptions): BhTableProps => {
  const columns: BhTableColumn[] = [];

  const _search = USE_MODULE(options.search);
  const _create = USE_MODULE(options.create);
  const _modify = USE_MODULE(options.modify);
  const _detail = USE_MODULE(options.detail);

  const getTable = (): InstanceType<typeof BhTable> => (columns as any)?.instance;

  options.columns.forEach((column) => {
    const label = isString(column.title) ? column.title : '';
    const field = column.dataIndex || '';
    const opt = { label, field, type: 'input', ...(column.common as object) };
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
    if (column.type === 'index') {
      defaultsDeep(column, USE_INDEX);
    }

    // 操作
    if (column.type === 'action' && isArray(column.action)) {
      if (_modify) {
        column.action.push({
          text: '修改',
          onClick: (data) => getTable()?.openModifyModal(data),
        });
      }

      if (_detail) {
        column.action.push({
          text: '详情',
          onClick: (data) => openDetailModal(data.record, _detail.items),
        });
      }

      column.action = column.action?.map((action) => {
        let onClick = action?.onClick;

        if (action.action === 'delete') {
          onClick = (data) => {
            Modal.warning({
              ...USE_DELETE,
              onOk: async () => {
                const resData = await action?.api?.(data);
                Message.success(resData.msg || '');
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
          const omitKeys = ['text', 'render', 'api', 'action', 'onClick'];
          return (
            <Link onClick={onClick} {...omit(action as any, omitKeys)}>
              {action.text}
            </Link>
          );
        });
    }

    const col = omit(column, ['create', 'modify', 'detail', 'search']);

    columns.push({ ...USE_COLUMN, ...col } as any);
  });

  if (_search) {
    _search.items.push({
      render: () => (
        <div class="">
          {_search?.items?.length > 4 && (
            <Button disabled={getTable().loading} onClick={() => getTable().reloadData()}>
              {{ icon: () => <IconRefresh></IconRefresh>, default: () => '重置' }}
            </Button>
          )}
          <Button type="primary" loading={getTable().loading} onClick={() => getTable().loadData()}>
            {{ icon: () => <IconSearch></IconSearch>, default: () => '查询' }}
          </Button>
        </div>
      ),
    });
  }

  const search = { ...USE_SEARCH, ...useForm(_search) };
  const create = { ...options.common, ...useForm(_create) };
  const modify = { ...options.common, trigger: false, ...useForm(_modify) };
  const detail = { ...options.common, ..._detail };

  return reactive({ ...options, columns, search, create, modify, detail }) as any;
};
