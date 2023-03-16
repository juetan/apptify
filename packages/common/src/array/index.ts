/**
 * 数组化
 * @param val 任意值或数组
 * @returns
 */
export const arraify = <T>(val: T | T[]): T[] => {
  return Array.isArray(val) ? val : [val];
};

/**
 * 是否为空数组，非数组返回 false
 * @param val 任意值或数组
 * @returns
 */
export const isEmptyArray = <T>(val: T | T[]): boolean => {
  return Array.isArray(val) ? val.length === 0 : false;
};

/**
 * 列表转换为树形结构
 * @param list 列表数据
 * @param parentId 父级ID
 * @param idKey 子级ID键名
 * @param parentIdKey 父级ID键名
 * @param childrenKey 子项键名
 * @returns
 */
export const listToTree = <T extends { id: string; parentId?: string; [key: string]: any }>(
  list: T[],
  parentId = '0',
  idKey = 'id',
  parentIdKey = 'parentId',
  childrenKey = 'children',
): T[] => {
  return list
    .filter((item) => item[parentIdKey] === parentId)
    .map((item) => ({
      ...item,
      [childrenKey]: listToTree(list, item[idKey], idKey, parentIdKey, childrenKey),
    }));
};

/**
 * 列表转换为字典
 * @param list 列表数据
 * @param idKey 字典键名
 * @returns
 */
export const listToMap = <T extends { id: string; [key: string]: any }>(list: T[], idKey = 'id'): Record<string, T> => {
  return list.reduce((acc, item) => {
    return { ...acc, [item[idKey]]: item };
  }, {} as Record<string, T>);
};

/**
 * 树形结构转换为列表
 * @param tree 树形结构数据
 * @param idKey 子级ID键名
 * @param parentIdKey 父级ID键名
 * @param childrenKey 子项键名
 * @returns
 */
export const treeToList = <T extends { id: string; parentId?: string; [key: string]: any }>(
  tree: T[],
  idKey = 'id',
  parentIdKey = 'parentId',
  childrenKey = 'children',
): T[] => {
  return tree.reduce((acc, item) => {
    return [...acc, item, ...treeToList(item[childrenKey], idKey, parentIdKey, childrenKey)] as T[];
  }, [] as T[]);
};

/**
 * 树形结构转换为字典
 * @param tree 树形结构数据
 * @param idKey 子级ID键名
 * @param parentIdKey 父级ID键名
 * @param childrenKey 子项键名
 * @returns
 */
export const treeToMap = <T extends { id: string; parentId?: string; [key: string]: any }>(
  tree: T[],
  idKey = 'id',
  parentIdKey = 'parentId',
  childrenKey = 'children',
): Record<string, T> => {
  return listToMap(treeToList(tree, idKey, parentIdKey, childrenKey), idKey);
};

/**
 * 树形结构遍历
 * @param tree 树形结构数据
 * @param callback 执行函数
 * @param idKey 子级ID键名
 * @param parentIdKey 父级ID键名
 * @param childrenKey 子项键名
 * @param parent 父级数据
 * @param index 当前索引
 */
export const treeTraverse = <T extends { id: string; parentId?: string; [key: string]: any }>(
  tree: T[],
  callback: (item: T, index: number, parent: T | null) => void,
  idKey = 'id',
  parentIdKey = 'parentId',
  childrenKey = 'children',
  parent: T | null = null,
  index = 0,
): void => {
  tree.forEach((item, i) => {
    callback(item, index + i, parent);
    treeTraverse(item[childrenKey], callback, idKey, parentIdKey, childrenKey, item, index + i + 1);
  });
};

/**
 * 树形结构查找
 * @param fn 查找函数
 * @param tree 树形结构数据
 * @param childrenKey 子项键名
 * @returns
 */
export const treeFind = <T extends { id: string; parentId?: string; [key: string]: any }>(
  fn: (item: T) => boolean,
  tree: T[],
  childrenKey = 'children',
): T | undefined => {
  if (!Array.isArray(tree)) {
    return undefined;
  }

  for (const item of tree) {
    if (fn(item)) {
      return item;
    }
    const found = treeFind(fn, item[childrenKey], childrenKey);
    if (found) {
      return found;
    }
  }

  return undefined;
};
