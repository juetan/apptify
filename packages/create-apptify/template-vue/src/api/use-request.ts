import { Message } from "@arco-design/web-vue";
import { ref } from "vue";

type PromiseFn = (...args: any[]) => Promise<any>;

type Options = {
  toast?: boolean | string;
};

export function useRequest<T extends PromiseFn>(fn: T, options: Options = {}) {
  const loading = ref(false);
  const error = ref<unknown>(null);
  const data = ref<Awaited<ReturnType<T>>>();
  const send = async (
    ...args: Parameters<T>
  ): Promise<[unknown, undefined] | [undefined, Awaited<ReturnType<T>>]> => {
    const { toast } = options;
    let message;
    if (toast) {
      const msg = typeof toast === "string" ? toast : "正在请求中...";
      message = Message.loading(msg);
    }
    try {
      loading.value = true;
      const res = await fn(...args);
      data.value = res;
      return [undefined, res];
    } catch (err) {
      error.value = err;
      return [err, undefined];
    } finally {
      loading.value = false;
      message?.close();
    }
  };
  return {
    loading,
    data,
    error,
    send,
  };
}
