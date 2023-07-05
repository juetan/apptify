import { Pagination } from '@/types/global';
import { TableColumnData } from '@arco-design/web-vue';
import { has, isFunction } from 'lodash';

export type BhTableApi = (model: any, pagination: Omit<Pagination, 'current'>) => Promise<any>;

export interface BhTableColumn extends TableColumnData {
  /** 当前列是否可见 */
  visible?: boolean | ((column: BhTableColumn) => boolean);
}

export const colFilter = (column: any) => {
  if (!has(column, 'visible')) {
    return true;
  }
  if (isFunction(column.visible)) {
    return column.visible(column);
  }
  return Boolean(column.visible);
};
