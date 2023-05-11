import { Divider, Table, TableData } from "@arco-design/web-vue";
import { PropType, computed, defineComponent, reactive, ref, watch } from "vue";
import { BhForm, BhFormModal, BhFormModalInstance, BhFormModalProps, BhFormProps } from "../../form";
import { BhTableApi, BhTableColumn, colFilter } from "./type";

export const BhTable = defineComponent({
  name: "BhTable",
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array as PropType<TableData[]>,
    },
    /**
     * 获取数据的函数
     */
    api: {
      type: Function as PropType<BhTableApi>,
    },
    /**
     * 表格列设置
     */
    columns: {
      type: Array as PropType<BhTableColumn[]>,
      required: true,
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
      type: Object as PropType<BhFormProps & { transform: (model: Record<string, any>) => Record<string, any> }>,
    },
    /**
     * 新建弹窗配置
     */
    create: {
      type: Object as PropType<BhFormModalProps>,
    },
    /**
     * 修改弹窗配置
     */
    modify: {
      type: Object as PropType<BhFormModalProps>,
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
    const createRef = ref<BhFormModalInstance>();
    const modifyRef = ref<BhFormModalInstance>();
    const renderData = ref<TableData[]>([]);
    const inlineSearch = computed(() => (props.search?.items?.length || 0) < 4);

    const getPaging = (pagination: Partial<any>) => {
      const { current: page, pageSize: size } = { ...props.pagination, ...pagination } as any;
      return { page, size };
    };

    const loadData = async (pagination: Partial<any> = {}) => {
      if (!props.api) {
        return;
      }

      let query = props.search?.model || {};
      if (props.search?.transform) {
        query = props.search.transform(query);
      }
      const paging = getPaging(pagination);

      try {
        loading.value = true;
        const resData = await props.api(query, paging);
        const { data = [], meta = {} } = resData || {};
        const { page: pageNum, total } = meta;
        console.log("d", data, resData);
        renderData.value = data;
        Object.assign(props.pagination, { current: pageNum, total });
      } finally {
        loading.value = false;
      }
    };

    const reloadData = () => loadData({ current: 1, pageSize: 10 });

    const openModifyModal = (data: any) => modifyRef.value?.open(data.record);

    const onPageChange = (current: number) => loadData({ current });

    const onCreateOk = () => {
      reloadData();
      props.create?.onOk?.();
    };

    const onModifyOk = () => {
      reloadData();
      props.modify?.onOk?.();
    };

    watch(
      () => props.data,
      (data) => Array.isArray(data) && (renderData.value = data)
    );

    loadData();

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
    Object.assign(this.columns, { instance: this });

    return (
      <div class="bh-table w-full">
        {!this.inlineSearch && (
          <div class="">
            <BhForm class="grid grid-cols-4 gap-x-4" {...this.search}></BhForm>
          </div>
        )}
        {!this.inlineSearch && <Divider class="mt-0 border-gray-200" />}
        <div class={`mb-2 flex justify-between ${!this.inlineSearch && "mt-2"}`}>
          <div class="flex-1 flex gap-2">
            {this.create && (
              <BhFormModal
                ref={(el: any) => (this.createRef = el)}
                onOk={this.onCreateOk}
                {...(this.create as any)}
              ></BhFormModal>
            )}
            {this.modify && (
              <BhFormModal
                ref={(el: any) => (this.modifyRef = el)}
                onOk={this.onModifyOk}
                {...(this.modify as any)}
              ></BhFormModal>
            )}
            {this.$slots.action?.()}
          </div>
          <div>{this.inlineSearch && <BhForm layout="inline" {...this.search}></BhForm>}</div>
        </div>
        <div>
          <Table
            row-key="id"
            loading={this.loading}
            pagination={this.pagination}
            data={this.renderData}
            bordered={false}
            columns={this.columns.filter((i) => colFilter(i))}
            onPageChange={this.onPageChange}
          ></Table>
        </div>
      </div>
    );
  },
});

export type BhTableInstance = InstanceType<typeof BhTable>;

export type BhTableProps = BhTableInstance["$props"] & InstanceType<typeof Table>["$props"];

export * from "./type";
