import {
  Divider,
  Table as BaseTable,
  TableColumnData as BaseColumn,
  TableData as BaseData,
} from "@arco-design/web-vue";
import { PropType, computed, defineComponent, reactive, ref, watch } from "vue";
import { Form, FormModal, FormModalInstance, FormModalProps, FormProps } from "../form";

export const Table = defineComponent({
  name: "Table",
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array as PropType<BaseData[]>,
    },
    /**
     * 获取数据的函数
     */
    api: {
      type: Function as PropType<any>,
    },
    /**
     * 表格列设置
     */
    columns: {
      type: Array as PropType<BaseColumn[]>,
      default: () => [],
    },
    /**
     * 分页参数配置
     */
    pagination: {
      type: Object as PropType<any>,
      default: () => reactive({ current: 1, pageSize: 10, total: 300, showTotal: true }),
    },
    /**
     * 搜索表单配置
     */
    search: {
      type: Object as PropType<FormProps>,
    },
    /**
     * 传递给 Table 组件的属性
     */
    tableProps: {
      type: Object as PropType<InstanceType<typeof BaseTable>["$props"]>,
    },
    /**
     * 新建弹窗配置
     */
    create: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 修改弹窗配置
     */
    modify: {
      type: Object as PropType<FormModalProps>,
    },
    /**
     * 详情弹窗配置
     */
    detail: {
      type: Object as PropType<any>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const createRef = ref<FormModalInstance>();
    const modifyRef = ref<FormModalInstance>();
    const renderData = ref<BaseData[]>([]);
    const inlineSearch = computed(() => (props.search?.items?.length || 0) < 4);

    Object.assign(props.columns, { getInstance: () => getCurrentInstance() });

    const getPaging = (pagination: Partial<any>) => {
      const { current: page, pageSize: size } = { ...props.pagination, ...pagination } as any;
      return { page, size };
    };

    const loadData = async (pagination: Partial<any> = {}) => {
      if (!props.api) {
        renderData.value =
          props.data?.filter((item) => {
            return Object.entries(props.search?.model || {}).every(([key, value]) => {
              return item[key] === value;
            });
          }) || [];
        props.pagination.total = renderData.value.length;
        props.pagination.current = 1;
        return;
      }
      const paging = getPaging(pagination);
      try {
        loading.value = true;
        const resData = await props.api(props.search?.model || {}, paging);
        const { data = [], meta = {} } = resData || {};
        const { page: pageNum, total } = meta;
        renderData.value = data;
        Object.assign(props.pagination, { current: pageNum, total });
      } finally {
        loading.value = false;
      }
    };

    const reloadData = () => {
      loadData({ current: 1, pageSize: 10 });
    };

    const openModifyModal = (data: any) => {
      modifyRef.value?.open(data.record);
    };

    const onPageChange = (current: number) => {
      loadData({ current });
    };

    const onCreateOk = () => {
      reloadData();
    };

    const onModifyOk = () => {
      reloadData();
    };

    watch(
      () => props.data,
      (data) => {
        if (!Array.isArray(data)) {
          return;
        }
        renderData.value = data;
        props.pagination.total = data.length;
        props.pagination.current = 1;
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      loadData();
    });

    return {
      loading,
      createRef,
      modifyRef,
      renderData,
      inlineSearch,
      loadData,
      reloadData,
      openModifyModal,
      onPageChange,
      onCreateOk,
      onModifyOk,
    };
  },
  render() {
    return (
      <div class="bh-table w-full">
        {!this.inlineSearch && (
          <div class="">
            <Form class="grid grid-cols-4 gap-x-4" {...this.search}></Form>
          </div>
        )}
        {!this.inlineSearch && <Divider class="mt-0 border-gray-200" />}
        <div class={`mb-2 flex justify-between ${!this.inlineSearch && "mt-2"}`}>
          <div class="flex-1 flex gap-2">
            {this.create && (
              <FormModal
                ref={(el: any) => (this.createRef = el)}
                onOk={this.onCreateOk}
                {...(this.create as any)}
              ></FormModal>
            )}
            {this.modify && (
              <FormModal
                ref={(el: any) => (this.modifyRef = el)}
                onOk={this.onModifyOk}
                trigger={false}
                {...(this.modify as any)}
              ></FormModal>
            )}
            {this.$slots.action?.()}
          </div>
          <div>{this.inlineSearch && <Form {...{ ...this.search, formProps: { layout: "inline" } }}></Form>}</div>
        </div>
        <div>
          <BaseTable
            row-key="id"
            bordered={false}
            {...this.tableProps}
            loading={this.loading}
            pagination={this.pagination}
            data={this.renderData}
            columns={this.columns}
            onPageChange={this.onPageChange}
          ></BaseTable>
        </div>
      </div>
    );
  },
});

export type TableInstance = InstanceType<typeof Table>;

export type TableProps = TableInstance["$props"];
