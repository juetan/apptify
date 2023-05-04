import { Response, ResponseCode } from '../response';

interface Options {
  page: number;
  size: number;
  [key: string]: any;
}

interface WrapOptions {
  page: number;
  size: number;
  total: number;
  data: any[];
}

export const defaultPage = 1;

export const defaultSize = 10;

/**
 * 分页工具类
 */
export class Pagination {
  /**
   * 包装响应结果
   */
  static wrap(options: WrapOptions) {
    const { page = defaultPage, size = defaultSize, total, data } = options;
    return Response.create({
      code: ResponseCode.SUCESS,
      message: '请求成功',
      data,
      meta: { page, size, total },
    });
  }
  /**
   * 将分页参数转换为typeorm查询参数
   */
  static optionize(options: Options) {
    const { page = defaultPage, size: take = defaultSize, ...where } = options || {};
    const skip = (page - 1) * take;
    return { skip, take, where };
  }
}
