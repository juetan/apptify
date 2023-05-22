/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  username: string;
  password: string;
  nickname: string;
  avatar: string;
}

export interface User {
  /** 用户角色 */
  roles: Role[];
  /**
   * 登录账号
   * @example "juetan"
   */
  username: string;
  /**
   * 用户昵称
   * @example "绝弹"
   */
  nickname: string;
  /**
   * 用户介绍
   * @example "这个人很懒, 什么也没有留下!"
   */
  description: string;
  /**
   * 用户头像(URL)
   * @example "./assets/222421415123.png "
   */
  avatar: string;
  /**
   * 用户密码
   * @example "password"
   */
  password: string;
}

export interface Role {
  id: number;
  user: User;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  nickname?: string;
  avatar?: string;
}

export type CreateRoleDto = object;

export type UpdateRoleDto = object;

export type CreateUploadDto = object;

export type UpdateUploadDto = object;

export interface SelectUsersParams {
  /**
   * 页码
   * @min 1
   */
  page: number;
  /**
   * 每页条数
   * @min 1
   */
  size: number;
}

import axios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set11 parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title 接口文档
 * @version 1.0
 * @externalDocs /openapi-json
 * @contact
 *
 * Openapi 3.0文档
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags user
     * @name CreateUser
     * @summary 创建用户
     * @request POST:/api/v1/users
     */
    createUser: (data: CreateUserDto, params: RequestParams = {}) => {
      return this.request<number, any>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name SelectUsers
     * @summary 批量查询
     * @request GET:/api/v1/users
     */
    selectUsers: (query: SelectUsersParams, params: RequestParams = {}) => {
      return this.request<User[], any>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name SelectUserv2
     * @summary 查询用户
     * @request GET:/api/v2/users/{id}
     */
    selectUserv2: (id: number, params: RequestParams = {}) => {
      return this.request<User, any>({
        path: `/api/v2/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name UpdateUser
     * @summary 更新用户
     * @request PATCH:/api/v1/users/{id}
     */
    updateUser: (id: number, data: UpdateUserDto, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags user
     * @name DeleteUser
     * @summary 删除用户
     * @request DELETE:/api/v1/users/{id}
     */
    deleteUser: (id: number, params: RequestParams = {}) => {
      return this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        ...params,
      });
    },
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @summary 账号登录
     * @request POST:/api/v1/auth/login
     */
    login: (params: RequestParams = {}) => {
      return this.request<void, void>({
        path: `/api/v1/auth/login`,
        method: "POST",
        ...params,
      });
    },
  };
  role = {
    /**
     * No description
     *
     * @tags role
     * @name RoleControllerCreate
     * @request POST:/api/v1/role
     */
    roleControllerCreate: (data: CreateRoleDto, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/role`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name RoleControllerFindAll
     * @request GET:/api/v1/role
     */
    roleControllerFindAll: (params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/role`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name RoleControllerFindOne
     * @request GET:/api/v1/role/{id}
     */
    roleControllerFindOne: (id: string, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/role/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name RoleControllerUpdate
     * @request PATCH:/api/v1/role/{id}
     */
    roleControllerUpdate: (id: string, data: UpdateRoleDto, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/role/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags role
     * @name RoleControllerRemove
     * @request DELETE:/api/v1/role/{id}
     */
    roleControllerRemove: (id: string, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/role/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
  upload = {
    /**
     * No description
     *
     * @tags upload
     * @name UploadControllerCreate
     * @request POST:/api/v1/upload
     */
    uploadControllerCreate: (data: CreateUploadDto, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/upload`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags upload
     * @name UploadControllerFindAll
     * @request GET:/api/v1/upload
     */
    uploadControllerFindAll: (params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/upload`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags upload
     * @name UploadControllerFindOne
     * @request GET:/api/v1/upload/{id}
     */
    uploadControllerFindOne: (id: string, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/upload/${id}`,
        method: "GET",
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags upload
     * @name UploadControllerUpdate
     * @request PATCH:/api/v1/upload/{id}
     */
    uploadControllerUpdate: (id: string, data: UpdateUploadDto, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/upload/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      });
    },

    /**
     * No description
     *
     * @tags upload
     * @name UploadControllerRemove
     * @request DELETE:/api/v1/upload/{id}
     */
    uploadControllerRemove: (id: string, params: RequestParams = {}) => {
      return this.request<string, any>({
        path: `/api/v1/upload/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      });
    },
  };
}
