### 基本用法

```typescript
<template>
  <Table v-bind="table" />
</template>
<script setup lang="ts">
import { Table, useTable } from '@/components'
const table = useTable({
  data: (search, paging) => {
    return {
      data: [
        {
          username: '用户A'
        }
      ],
      meta: {
        total: 30
      }
    };
  },
  columns: [
    {
      title: "用户名称",
      dataIndex: "username",
    },
  ],
  pagination: {
    pageSize: 10,
    showTotal: true
  },
  search: {
    items: [
      {
        field: "username",
        label: "用户名称",
        type: "input",
      },
    ],
  },
  common: {
    items: [
      {
        field: "username",
        label: "用户名称",
        type: "input",
      },
    ],
  },
  create: {
    title: "新建用户",
    submit: async ({ model }) => {
      return api.xx(model);
    },
  },
  modify: {
    title: "修改用户",
    submit: async ({ model }) => {
      return api.xx(model);
    },
  },
});
</script>
```
以上，就是一个CRUD表格的简单用法。参数描述：
| 参数 | 说明 | 类型 |
| :--- | :--- | :--- |
| data | 表格数据，可为数组或函数(发起HTTP请求) | BaseData[] | ((search, paging) => Promise<any>) |
| columns | 表格列，参见 [TableColumnData](https://arco.design/vue/component/table#TableColumnData) 文档，增加和扩展部分属性，详见下文。 | TableColumnData[] |
| pagination | 分页参数，参见 [Pagination](https://arco.design/vue/component/pagination) 文档，默认 15/每页。| Pagination |
| search | 搜索表单的配置，参见 [Form]() 说明，其中 `submit` 参数不可用 | FormProps |
| common | 新增和修改表单弹窗的公用参数，参见 [FormModal]() 说明。 | FormModalProps |
| create | 新增表单弹窗的参数，参见 [FormModal]() 说明， 将与`common`参数合并。 | FormModalProps |
| modify | 修改表单弹窗的参数，参见 [FormModal]() 说明， 将与`common`参数合并。 | FormModalProps |
| tableProps | 传递给`Table`组件的参数，参见 [Table](https://arco.design/vue/component/table) 文档，其中`columns`参数不可用。| TableProps |

### 表格数据
`data`定义表格数据，

### 表格列
`columns`定义表格列，并在原本基础上增加默认值并扩展部分属性。增加和扩展的属性如下：

| 参数 | 说明 | 类型 |
| :--- | :--- | :--- |
| type | 特殊类型, 目前支持`index`(表示行数)、`button`(行操作按钮) | 'index' | 'button' |
| buttons | 当`type`为`button`时的按钮数组，如果子项是对象则为`Button`组件的参数，如果为函数则为自定义渲染函数。 | Button[]