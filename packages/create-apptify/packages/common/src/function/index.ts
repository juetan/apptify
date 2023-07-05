/**
 * 无操作函数
 */
export const noop = () => {};

/**
 * 暂停函数
 * @param ms 单位:毫秒
 * @returns
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
