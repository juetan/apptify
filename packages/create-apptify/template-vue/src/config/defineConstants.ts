interface Item {
  label: string;
  value: any;
  enumKey: string;
  [key: string]: any;
}

const ConstantsProto = {
  pick(...keys: any[]) {
    return (this as unknown as any[]).filter((item) => keys.includes(item.value));
  },
  maping(keyKey: string, valueKey?: string) {
    return (this as unknown as any[]).reduce(
      (acc, i) => ((acc[i[keyKey]] = valueKey ? i[valueKey] : i), acc),
      {} as any
    );
  },
};

Object.setPrototypeOf(ConstantsProto, Array.prototype);

type ArrayMap<
  A extends readonly Item[],
  K extends keyof A[number],
  B extends string[] = []
> = A["length"] extends B["length"] ? B : ArrayMap<A, K, [...B, A[B["length"]][K]]>;

type ArrayFind<A extends readonly Item[], V extends A[number]["value"]> = A extends readonly [
  infer I extends Item,
  ...infer R extends Item[]
]
  ? I["value"] extends V
    ? I["label"]
    : ArrayFind<R, V>
  : "nev1er";

/**
 * 定义字典常量
 */
export function defineConstants<T extends readonly Item[]>(
  defs: T
): {
  /**
   * 枚举值
   */
  [K in T[number] as K["enumKey"]]: K["value"];
} & {
  /**
   * 字典项映射
   */
  maps: {
    [k in T[number] as k["value"]]: k;
  };
  /**
   * 所有值组成的数组
   */
  value: ArrayMap<T, "value">;
  /**
   * 获取指定值的项
   */
  pick(...values: T[number]["value"][]): T;
  /**
   * TODO
   */
  omit(): T;
  /**
   * 返回数组，由指定属性的值组成
   */
  each<K extends keyof T[number]>(key: K): T[number][K][];
  /**
   * 格式化
   * @param value 值
   */
  format<K extends T[number]["value"]>(value: K, key?: keyof T[number]): ArrayFind<T, K>;
  /**
   * 映射成label/value数组
   */
  maping<K extends keyof T[number], V extends keyof T[number]>(
    keyKey: K,
    valueKey?: V
  ): { [P in T[number] as P[K]]: keyof T[number] extends V ? P : P[V] };
} & T {
  const enums = defs.reduce((acc, item) => ((acc[item.enumKey] = item.value), acc), {} as Record<string, any>);
  Object.assign(defs, enums);
  return Object.setPrototypeOf(defs, ConstantsProto);
}
