export const SECONDS_IN_DAY = 24 * 60 * 60 * 1000;

interface Item {
  label: string;
  value: any;
  enumKey: string;
  [key: string]: any;
}

const ConstantsProto = {
  pick(...keys: string[]) {
    return (this as unknown as any[]).map((item) =>
      keys.reduce((acc, key) => ((acc[key] = item[key]), acc), {} as any),
    );
  },
  get kv() {
    return this.pick('label', 'value');
  },
  get labels() {
    return (this as unknown as any[]).map((i) => i.label);
  },
  maping(keyKey: string, valueKey?: string) {
    return (this as unknown as any[]).reduce(
      (acc, i) => ((acc[i[keyKey]] = valueKey ? i[valueKey] : i), acc),
      {} as any,
    );
  },
};

Object.setPrototypeOf(ConstantsProto, Array.prototype);

type ArrayMap<
  A extends readonly Item[],
  K extends keyof A[number],
  B extends string[] = [],
> = A['length'] extends B['length'] ? B : ArrayMap<A, K, [...B, A[B['length']][K]]>;

type ArrayFind<A extends readonly Item[], V extends A[number]['value']> = A extends readonly [
  infer I extends Item,
  ...infer R extends Item[],
]
  ? I['value'] extends V
    ? I['label']
    : ArrayFind<R, V>
  : 'nev1er';

/**
 * accept an array, return an extended array,
 * which provides properties and methods for key/value dictionary purpose
 * the array need to be passed with `as const` annotation
 */
function defineConstants<T extends readonly Item[]>(
  defs: T,
): T & {
  [K in T[number] as K['enumKey']]: K['value'];
} & {
  pick(...keys: (keyof T[number])[]): 1;
  find(key: keyof T[number]): 1;
  format<K extends T[number]['value']>(value: K): ArrayFind<T, K>;
  get kv(): 1;
  get labels(): ArrayMap<T, 'label'>;
  /**
   * consist of each object's label value in the array
   */
  get values(): ArrayMap<T, 'value'>;
  /**
   * the keys of the object array
   */
  get keys(): { [k in keyof T[number]]: k };
  maping<K extends keyof T[number], V extends keyof T[number]>(
    keyKey: K,
    valueKey?: V,
  ): { [P in T[number] as P[K]]: keyof T[number] extends V ? P : P[V] };
} {
  const enums = defs.reduce((acc, item) => ((acc[item.enumKey] = item.value), acc), {} as Record<string, any>);
  Object.assign(defs, enums);
  return Object.setPrototypeOf(defs, ConstantsProto);
}

/**
 * 媒体类型
 */
const Media = defineConstants([
  {
    label: '视频',
    value: 1,
    enumKey: 'VIDEO',
    TODO: '1',
  },
  {
    label: '图片',
    value: 2,
    enumKey: 'IMAGE',
    TODO: '1',
  },
  {
    label: '文本',
    value: 3,
    enumKey: 'TEXT',
    TODO: '1',
  },
] as const);

Media.pick('label', 'value');

Media.maping('value', 'enumKey');

Media.labels;

Media.values.includes('' as any);

Media.format(Media.TEXT);

Media.keys.name;
